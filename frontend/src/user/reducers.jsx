import { _t, createImageURL } from "../imports.jsx"

import { initialState } from "../common/reducers.jsx"


export default {

    // fill in existing user data; called when showing the user profile form
    INIT_PROFILE_FORM: (state) => ({
        ...state, 
        userProfileForm: state.signedInUserData
    }),

    // update the state of any value change in CustomInputControl
    UPDATE_FORM_FIELD: (state, payload) => ({
        ...state, 
        [payload.form]: {
            ...state[payload.form], 
            [payload.id]: payload.value
        }
    }),

    // update new user data in state, after succesfully changing it in the database
    USER_PROFILE_UPDATED: (state, payload) => ({
        ...state,
        errMsg: '',
        signedInUserData: {
            ...state.signedInUserData,
            username: payload.name, 
            firstName: payload.firstName,
            lastName: payload.lastName,
        },
        infoMsg: `${_t('Successfully saved user data for')} ${payload.firstName} ${payload.lastName}`
    }),

    // update new user image in the state, after succesfully changing it in the database
    USER_PROFILE_IMAGE_UPDATED: (state, payload) => {
        if (!payload.img) return state

        const imageData = payload._attachments[payload.img]
            ? createImageURL(payload._attachments[payload.img]) 
            : "assets/img/userm.png"
        
        return {
            ...state, 
            signedInUserData: {
                ...state.signedInUserData, 
                imageData: imageData
            },
            userProfileForm: {
                ...state.userProfileForm, 
                imageData: imageData
            },
            infoMsg: `${_t('Successfully updated user image for')} ${state.signedInUserData.firstName} ${state.signedInUserData.lastName}`
        }
    },
       
    // update user data in state after successful sign in
    SIGNED_IN: (state, payload) => ({
        ...state, 
        signedIn: true, 
        signedInUserData: {
            username: payload.name, 
            firstName: payload.firstName,
            lastName: payload.lastName,
            imageData: payload.img && payload._attachments[payload.img]
                ? createImageURL(payload._attachments[payload.img]) 
                : "assets/img/userm.png"
        },
        infoMsg: `${payload.firstName} ${payload.lastName} ${_t('is signed in')}!`
    }),

    // reset state after successful sign out
    SIGNED_OUT: (state, payload) => ({
        ...initialState, 
        language: state.language,
        infoMsg: `${payload.firstName} ${payload.lastName} ${_t('is signed out')}!`
    }),
}
