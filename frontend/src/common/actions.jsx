import { i18n, lngs } from "../imports.jsx"

export const SHOW_MENU =                "SHOW_MENU"
export const LANGUAGE_CHANGED =         "LANGUAGE_CHANGED"
export const CLEAR_ERROR_MESSAGE =      "CLEAR_ERROR_MESSAGE"
export const CLEAR_INFO_MESSAGE =       "CLEAR_INFO_MESSAGE"


export const showMenu = menu => dispatch => dispatch({type: SHOW_MENU, payload: menu})

export const clearErrorMessage = () => dispatch => dispatch({type: CLEAR_ERROR_MESSAGE})

export const clearInfoMessage = () => dispatch => dispatch({type: CLEAR_INFO_MESSAGE})

export const changeLanguage = language => dispatch => 
{
    language = language || lngs.find(l => l.value === i18n.language)

    i18n.changeLanguage(language.value, () => {
        dispatch({type: SHOW_MENU})
        dispatch({type: LANGUAGE_CHANGED, payload: language})
    })
}