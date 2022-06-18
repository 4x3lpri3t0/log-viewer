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

import db from "./db.jsx";

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
    errMsg: state.errMsg,
    infoMsg: state.infoMsg,
  }),
  (dispatch) => ({
    getSession: () => dispatch(userActions.getSession()),
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

const getDocument = function () {
  //   if (props.password !== props.repeatPassword)
  //     return dispatch({ type: ERROR, payload: "Passwords do not match" });

  //   dispatch({ type: IN_PROGRESS, payload: IN_PROGRESS_SIGNIN });

  console.log("MMMHHH...");

  db.initDb("logs");

  db.getDocs("logs")
    .then((response) => {
      console.log("GOOD");
      console.log(response);
    })
    .catch((err) => {
      console.log("BAD");
      console.log(err);
      throw err;
    });

  //   db.getDoc("logs", "6b1de0ffe31b04474ec38a999e003b15")
  //     .then((doc) => {
  //       console.log("GOOD");
  //       console.log(doc);
  //     })
  //     .catch((err) => {
  //       console.log("BAD");
  //       console.log(err);
  //       throw err;
  //     });

  // .then(() => dispatch(signIn(props)))
  // .catch((err) => dispatch(toAction(err)));
};
getDocument();

// Render the main class into DOM

ReactDOM.render(<></>, document.getElementById("index"));

// ReactDOM.render(
//   //   <Provider store={store}>
//   //     <Router history={createBrowserHistory({ basename: WP_CONF_BASE_URL })}>
//   //       <StyledMain />
//   //     </Router>
//   //   </Provider>,

// //   document.getElementById("index")
// );
