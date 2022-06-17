import { React, connect, _t, Link, Redirect,
		withStyles, LockOutlinedIcon, Avatar, Button, LinearProgress, Paper, Typography
} from "../../imports.jsx"

import styles from "../style.jsx"
import * as userActions from "../actions.jsx"
import { CustomInputControl } from "../../common/components.jsx"


class _SignUpForm extends React.Component {
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
							{_t('Sign up')} 
					</Typography>

					<form className={props.classes.form}>

						<CustomInputControl 
							id="firstName" 
							label={_t('First Name')} 
							value={props.signUpForm.firstName}
							onChange={props.updateFormField}
							autoFocus={true}/>
						
						<CustomInputControl 
							id="lastName" 
							label={_t('Last Name')}
							value={props.signUpForm.lastName}
							onChange={props.updateFormField}/>
						
						<CustomInputControl 
							id="username" 
							label={_t('New Username')}
							value={props.signUpForm.username}
							onChange={props.updateFormField} />
						
						<CustomInputControl 
							id="password" 
							label={_t('New Password')} 
							value={props.signUpForm.password}
							onChange={props.updateFormField}
							type="password" />
						
						<CustomInputControl 
							id="repeatPassword" 
							label={_t('Repeat Password')} 
							value={props.signUpForm.repeatPassword}
							onChange={props.updateFormField}
							type="password" />
						
						<CustomInputControl 
							id="email" 
							label={_t('Email Address')}
							value={props.signUpForm.email}
							onChange={props.updateFormField} />

						{
							props.inProgress === userActions.IN_PROGRESS_SIGNUP

							? 
								<LinearProgress/>

							:
								<Button 
									id="signupButton"
									fullWidth 
									variant="contained" 
									color="primary" 
									className={props.classes.submit} 
									onClick={()=>props.signUp(props.signUpForm)}> 
										{_t('Submit')}
								</Button>
						}
							
						<Button 
							fullWidth 
							variant="contained" 
							color="secondary" 
							className={props.classes.submit}> 
								
								<Link to="/" className={props.classes.link}>
									{_t('Cancel')}
								</Link>
						</Button>

					</form>
				</Paper>
			</main>
	}
}



// connect the sign up form to state 
const SignUpForm = connect(
	state => ({
		signedIn: state.signedIn,
		signUpForm: state.signUpForm,
		inProgress: state.inProgress,
		language: state.language
	}),
	dispatch => ({
		updateFormField: (id, value) => dispatch(userActions.updateFormField(id, value, "signUpForm")),
		signUp: props => dispatch(userActions.signUp(props))
	})
)(withStyles(styles)(_SignUpForm))



export { _SignUpForm, SignUpForm }