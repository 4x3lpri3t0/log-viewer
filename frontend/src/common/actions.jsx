export const SHOW_MENU = "SHOW_MENU";
export const CLEAR_ERROR_MESSAGE = "CLEAR_ERROR_MESSAGE";
export const CLEAR_INFO_MESSAGE = "CLEAR_INFO_MESSAGE";

export const showMenu = (menu) => (dispatch) =>
  dispatch({ type: SHOW_MENU, payload: menu });

export const clearErrorMessage = () => (dispatch) =>
  dispatch({ type: CLEAR_ERROR_MESSAGE });

export const clearInfoMessage = () => (dispatch) =>
  dispatch({ type: CLEAR_INFO_MESSAGE });
