import { React, ReactDOM, connect, Provider, Router, Switch, Route, createBrowserHistory,
        createStore, applyMiddleware, thunkMiddleware, createLogger,
        withStyles, classNames, CssBaseline, SnackbarProvider, withSnackbar
} from "./imports.jsx"


import styles from "./common/style.jsx"
import { commonReducers, initialState } from "./common/reducers.jsx"
import userReducers from "./user/reducers.jsx"

import { MainAppBar } from "./common/views/mainAppBar.jsx"
import { Home } from "./common/views/home.jsx"
import { Landing } from "./common/views/landing.jsx"
import { SignInForm } from "./user/views/signinForm.jsx"
import { SignUpForm } from "./user/views/signupForm.jsx"
import { ProfileForm } from "./user/views/profileForm.jsx"


import * as mainActions from "./common/actions.jsx"
import * as userActions from "./user/actions.jsx"



// Definitions of the main class

class Main extends React.Component {
    componentDidMount(){
        this.props.getSession()
        this.props.changeLanguage()
    }

    componentDidUpdate(){
        if (this.props.errMsg){
            this.props.enqueueSnackbar(this.props.errMsg, {variant: "error"})
            this.props.clearErrorMessage()
        }

        if (this.props.infoMsg){
            this.props.enqueueSnackbar(this.props.infoMsg, {variant: "success"})
            this.props.clearInfoMessage()
        }
    }

    render(){
        const props = this.props

        return <div className={classNames(props.classes.root)}>
            
            <CssBaseline />

            <MainAppBar/>

            <main 
                className={props.classes.content}>
                    <Switch>
                        <Route 
                            path="/"
                            component={props.signedIn ? Home : Landing} 
                            exact />

                        <Route 
                            path="/signin" 
                            component={SignInForm}
                            exact />
                        
                        <Route 
                            path={"/signup"}
                            component={SignUpForm} 
                            exact />

                        <Route 
                            path={"/profile"} 
                            component={ProfileForm} 
                            exact />
                    </Switch>
            </main>
        </div>
    }
}


// Connect the main class with state and dispatch

const StyledMain = connect(
    state => ({
        signedIn: state.signedIn,
        shownMenu: state.shownMenu,
        language: state.language,
        errMsg: state.errMsg,
        infoMsg: state.infoMsg
    }),
    dispatch => ({
        getSession: () => dispatch(userActions.getSession()),
        changeLanguage: () => dispatch(mainActions.changeLanguage()),
        clearErrorMessage: () => dispatch(mainActions.clearErrorMessage()),
        clearInfoMessage: () => dispatch(mainActions.clearInfoMessage())
    })
)(withSnackbar(withStyles(styles)(Main)))




// Initialize the store

const reducerFunctions = { 
    ...commonReducers, 
    ...userReducers 
}

const store = createStore (
    (state = initialState, action) => 
        (reducerFunctions[action.type] || (()=>initialState)) (state, action.payload),
    
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
)



// Render the main class into DOM

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory({basename: WP_CONF_BASE_URL})} >
            <SnackbarProvider maxSnack={3}>
                <StyledMain/>
            </SnackbarProvider>
        </Router>
    </Provider>, document.getElementById("index")
);