import { _t } from "../imports.jsx"

export const initialState = {
    signInForm: {},
    signUpForm: {},
    userProfileForm: {}
}

export const commonReducers = {

    '@@INIT' : initialState,

    '@@redux/INIT' : initialState,

    // set the 'showMenu' state
    SHOW_MENU: (state, payload) => ({
        ...state, 
        shownMenu: payload
    }),

    // store a general error message in state, to activate snackbar notifications
    ERROR: (state, payload) => ({
        ...state, 
        errMsg: payload,
        inProgress: ""
    }),

    // store which progress bar is acive
    IN_PROGRESS: (state, payload) => ({
        ...state, 
        inProgress: payload
    }),

    // clear the error message from the state
    CLEAR_ERROR_MESSAGE: state => ({
        ...state, 
        errMsg: ""
    }),

    // clear info message from the state
    CLEAR_INFO_MESSAGE: state => ({
        ...state, 
        infoMsg: ""
    }),

    // update language in state after a successfful language change
    LANGUAGE_CHANGED: (state, payload) => ({
        ...state,
        language: payload.value,
        infoMsg: `${_t('Language changed to')} ${payload.label}!`
    })
}