export const initialState = {
  //   signInForm: {},
  //   signUpForm: {},
  //   userProfileForm: {},
};

export const commonReducers = {
  "@@INIT": initialState,

  "@@redux/INIT": initialState,

  // set the 'showMenu' state
  SHOW_MENU: (state, payload) => ({
    ...state,
    shownMenu: payload,
  }),

  // store a general error message in state, to activate snackbar notifications
  ERROR: (state, payload) => ({
    ...state,
    errMsg: payload,
    inProgress: "",
  }),

  // store which progress bar is acive
  IN_PROGRESS: (state, payload) => ({
    ...state,
    inProgress: payload,
  }),

  // clear the error message from the state
  CLEAR_ERROR_MESSAGE: (state) => ({
    ...state,
    errMsg: "",
  }),

  // clear info message from the state
  CLEAR_INFO_MESSAGE: (state) => ({
    ...state,
    infoMsg: "",
  }),
};
