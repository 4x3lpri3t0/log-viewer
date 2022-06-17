import { _t, utf8ToHex } from "../imports.jsx"
import db from "../db.jsx"

// Redux Actions
export const UPDATE_FORM_FIELD =            "UPDATE_FORM_FIELD"
export const INIT_PROFILE_FORM =            "INIT_PROFILE_FORM"

export const USER_PROFILE_IMAGE_UPDATED =   "USER_PROFILE_IMAGE_UPDATED"
export const USER_PROFILE_UPDATED =         "USER_PROFILE_UPDATED"

export const SIGNED_IN =                    "SIGNED_IN"
export const SIGNED_OUT =                   "SIGNED_OUT"
export const ERROR =                        "ERROR"
export const IN_PROGRESS =                  "IN_PROGRESS"


// In progress constants
export const IN_PROGRESS_SIGNUP =               "IN_PROGRESS_SIGNUP"
export const IN_PROGRESS_SIGNIN =               "IN_PROGRESS_SIGNIN"
export const IN_PROGRESS_UPDATE_PROFILE =       "IN_PROGRESS_UPDATE_PROFILE"
export const IN_PROGRESS_UPDATE_PROFILE_IMG =   "IN_PROGRESS_UPDATE_PROFILE_IMG"


// user readable messages corresponding to couchdb errors
const couchdbErrMessages = {
    conflict: _t("Username already exists"),
    forbidden: _t("You are not allowed to authenticate with these credentials"),
    unauthorized: _t("Invalid user credentials"),
    authentication_error: _t("Invalid user credentials"),
    not_found: _t("Problem with user account, please contact admins"),
}



// shortcut function to generate corresponding error action
const toAction = err => ({
    type: ERROR,  
    payload: couchdbErrMessages[err.name] || _t("Network error")
})


// sign up the user to couchdb
export const signUp = props => dispatch => {
    if (props.password !== props.repeatPassword)
        return dispatch({type: ERROR, payload: _t("Passwords do not match")})

    dispatch({type: IN_PROGRESS, payload: IN_PROGRESS_SIGNIN})

    db.remote.signUp(props.username, props.password, {
            metadata : {
                firstName: props.firstName, 
                lastName: props.lastName
            }
    })
    .then(() => dispatch(signIn(props)))    
    .catch(err => dispatch(toAction(err))) 
}



// sign in the user to couchdb
export const signIn = props => dispatch =>
    db.remote.logIn(props.username, props.password).then(() => {

        dispatch({type: IN_PROGRESS, payload: IN_PROGRESS_SIGNIN})
        
        const userdbName = `userdb-${utf8ToHex(props.username)}`
        
        db.initUserDb(userdbName)
        db.user.remote.logIn(props.username, props.password).then(() => {
            db.syncUserDb()
            db.initDb("public")
            db.public.remote.logIn(props.username, props.password).then(() => {
                db.syncDb("public")
                dispatch(retreiveUserData(props.username))
            })
        })
    }).catch(err => dispatch(toAction(err)))



// get session from couchdb in case there is still a valid one
export const getSession = () => dispatch =>
    db.remote.getSession().then(response => {
        const username = response.userCtx.name
        if (!username)
            return

        const userdbName = `userdb-${utf8ToHex(username)}`
        
        db.initUserDb(userdbName)    
        db.user.remote.getSession().then(() => {
            db.syncUserDb()
            db.initDb("public")
            db.public.remote.getSession(username).then(() => {
                db.syncDb("public")
                dispatch(retreiveUserData(username))
            })
        })
        .catch(err => dispatch(toAction(err)))
    }).catch(err => dispatch(toAction(err)))



// retreive user data
const retreiveUserData = username => async dispatch => {
    let profileImg = {_id: "profileImg"}

    db.remote.getUser(username).then(userMetaData => 
        db.user.local.get('profileImg', {attachments: true, binary: true})
            .then(profileImgDoc => profileImg = profileImgDoc)
            .catch(async err => err.reason === "missing" && await db.user.local.put(profileImg))
            .finally(() => {
                dispatch({
                    type: SIGNED_IN,  
                    payload: {...userMetaData, ...profileImg}
                })
                dispatch({type: IN_PROGRESS})
            }))
    .catch(err => dispatch(toAction(err)))
}


// initialize edit user profile form with existing data from signed in user 
export const initProfileForm = () => dispatch => 
    dispatch({ type: INIT_PROFILE_FORM })



// update a form field in state
export const updateFormField = (id, value, form) => async dispatch =>
    dispatch({
        type: UPDATE_FORM_FIELD, 
        payload: {
            id: id, 
            value:value, 
            form: form
        }
    })
    


// update user profile fields
export const updateProfile = props => dispatch => {
    let userData = {}
    if (props.password || props.repeatPassword)
    {
        if (props.password !== props.repeatPassword)
        return dispatch({
            type:ERROR, 
            payload: _t("Passwords do not match")
        })
        userData.password = props.password
    }

    dispatch({type: IN_PROGRESS, payload: IN_PROGRESS_UPDATE_PROFILE})

    if (props.firstName) 
        userData.firstName = props.firstName

    if (props.lastName) 
        userData.lastName = props.lastName

    db.remote.putUser(props.username, { metadata : userData }).then(() => 
        db.remote.getUser(props.username).then(doc => {
            dispatch({
                type: USER_PROFILE_UPDATED,  
                payload: doc
            })
            dispatch({type: IN_PROGRESS})
        })
    
    ).catch(() => 
        dispatch({
            type: ERROR, 
            payload: _t("Error while updating the user profile")
        }))
}



// upload user profile image to couchdb
export const addUserImg = (username, path, file) => dispatch =>
{
	if (!path.split(".").length)
        return
        
    let profileImgDoc = {_id: 'profileImg'}
    dispatch({type: IN_PROGRESS, payload: IN_PROGRESS_UPDATE_PROFILE_IMG})

    db.user.local.get('profileImg').then(doc => profileImgDoc = doc).finally(() => {

		const imgName = "profile." + file.name.split(".").reverse()[0]
		db.user.local.put({
            ...profileImgDoc,
			img: imgName,
            _attachments: { 
                [imgName]: {content_type: file.type, data: file}
            }
		})
        .then(() => 
            db.user.local.get('profileImg', {
                attachments: true, 
                binary: true
            }).then(doc => {
                dispatch({
                    type: USER_PROFILE_IMAGE_UPDATED,  
                    payload: doc
                })
                dispatch({type: IN_PROGRESS})
            }))
	})
}

      

// sign out the user from couchdb
export const signOut = (firstName, lastName) => dispatch => {
    db.user && db.user.sync.cancel()

    db.remote.logOut().then(() => 
        db.user.remote.logOut().then(() =>
            dispatch({
                type: SIGNED_OUT, 
                payload: {
                    firstName: firstName, 
                    lastName: lastName
                }})))
    .catch(() => 
        dispatch({
            type: ERROR,  
            payload: _t("Couldn't sign out")
        }))
}
