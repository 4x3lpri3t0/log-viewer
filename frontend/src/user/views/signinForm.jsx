import { React, connect, _t, Redirect, Link,
		withStyles, Avatar, Button, LinearProgress, LockOutlinedIcon, Paper, Typography
} from "../../imports.jsx"

import styles from "../style.jsx"
import * as userActions from "../actions.jsx"
import { CustomInputControl } from "../../common/components.jsx"


class _SignInForm extends React.Component {
	render(){
		const props = this.props

		return props.signedIn 
		
			// if already signed in
			? <Redirect to="/"/>
	
			// else show the sign in form
			: <main className={props.classes.main}>
				<Paper className={props.classes.paper}>
					<Avatar className={props.classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					
					<Typography 
						component="h1" 
						variant="h5"> 
							{_t('Sign in')} 
					</Typography>
							
					<form className={props.classes.form}>
		
						<input 
							type="hidden" 
							value="just a dummy because of a chrome bug"/>
		
						<CustomInputControl 
							id="username" 
							label={_t('Username')} 
							value={props.signInForm["username"]}
							onChange={props.updateFormField}
							autoFocus 
							form={"signInForm"}/>

						<CustomInputControl 
							id="password" 
							label={_t('Password')} 
							value={props.signInForm["password"]}
							onChange={props.updateFormField}
							type="password" 
							form={"signInForm"}/>

						{
							props.inProgress === userActions.IN_PROGRESS_SIGNIN

							? 
								<LinearProgress/>

							:
								<Button 
									id="signinButton"
									fullWidth 
									variant="contained" 
									color="primary"
									className={props.classes.submit} 
									onClick={()=>props.signIn(props.signInForm)}> 
										{_t('Sign in')}
								</Button>
						}

						<Link 
							to="/signup"
							className={props.classes.link}>
					
								<Button 
									id="register" 
									fullWidth 
									variant="contained" 
									className={props.classes.button}>
										{_t('Not a user? Sign up here')}
								</Button>
						</Link>
					</form>
				</Paper>
			</main>
	}
}




// connect the sign in form to state 
const SignInForm = connect(
	state => ({
		signedIn: state.signedIn,
		signInForm: state.signInForm,
		inProgress: state.inProgress,
		language: state.language
	}),

	dispatch => ({
		updateFormField: (id, value) => dispatch(userActions.updateFormField(id, value, "signInForm")),
		signIn: props => dispatch(userActions.signIn(props))
	})
)(withStyles(styles)(_SignInForm))



export { _SignInForm, SignInForm }