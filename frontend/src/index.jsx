import {
  React,
  ReactDOM,
  connect,
  Provider,
  Router,
  createBrowserHistory,
  applyMiddleware,
  thunkMiddleware,
  createLogger,
} from "./imports.jsx";

import { commonReducers, initialState } from "./common/reducers.jsx";
import userReducers from "./user/reducers.jsx";

import { Home } from "./common/views/home.jsx";
import { Landing } from "./common/views/landing.jsx";

import * as mainActions from "./common/actions.jsx";
import * as userActions from "./user/actions.jsx";

// Definitions of the main class

class Main extends React.Component {
  componentDidMount() {
    this.props.getSession();
    this.props.changeLanguage();
  }

  componentDidUpdate() {
    if (this.props.errMsg) {
      this.props.clearErrorMessage();
    }

    if (this.props.infoMsg) {
      this.props.clearInfoMessage();
    }
  }

  render() {
    const props = this.props;

    return (
      <div>
        <main className={props.classes.content}></main>
      </div>
    );
  }
}

// Connect the main class with state and dispatch

const StyledMain = connect(
  (state) => ({
    signedIn: state.signedIn,
    shownMenu: state.shownMenu,
    language: state.language,
    errMsg: state.errMsg,
    infoMsg: state.infoMsg,
  }),
  (dispatch) => ({
    getSession: () => dispatch(userActions.getSession()),
    changeLanguage: () => dispatch(mainActions.changeLanguage()),
    clearErrorMessage: () => dispatch(mainActions.clearErrorMessage()),
    clearInfoMessage: () => dispatch(mainActions.clearInfoMessage()),
  })
)(Main);

// Initialize the store

const reducerFunctions = {
  ...commonReducers,
  ...userReducers,
};

// const store = createStore(
//   (state = initialState, action) =>
//     (reducerFunctions[action.type] || (() => initialState))(
//       state,
//       action.payload
//     ),

//   applyMiddleware(thunkMiddleware, createLogger())
// );

// Render the main class into DOM

ReactDOM.render(
  //   <Provider store={store}>
  //     <Router history={createBrowserHistory({ basename: WP_CONF_BASE_URL })}>
  //       <StyledMain />
  //     </Router>
  //   </Provider>,
  document.getElementById("index")
);
