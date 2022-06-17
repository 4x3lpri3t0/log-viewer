import { React, connect, _t, Redirect, Link,
		withStyles, Paper, Typography, Button, LinearProgress} from "../../imports.jsx"

import { CustomInputControl, UserImageControl } from "../../common/components.jsx"

import styles from "../style.jsx"
import * as userActions from "../actions.jsx"


class _ProfileForm extends React.Component {
	componentDidMount(){
		this.props.initProfileForm()
	}


	render(){
		const props = this.props

		return props.signedIn ? 

			props.userProfileForm ?

				// if the user profile form is initialized
				<main className={props.classes.main}>
					<Paper className={props.classes.paper}>
				
						{
							props.inProgress === userActions.IN_PROGRESS_UPDATE_PROFILE_IMG

							? 
								<LinearProgress/>
							:
								<UserImageControl 
									id="imagePath" 
									classes={props.classes}
									src={props.userProfileForm.imageData} 
									username={props.userProfileForm.username
												|| props.signedInUserData.username}
									onChange={props.updateProfileImg}
								/>
						}
	
						<Typography 
							component="h1" 
							variant="h5"> 
								{props.userProfileForm.username} 
						</Typography>
	
						<form className={props.classes.form}>
							<React.Fragment>
					
								<CustomInputControl 
									id="firstName" 
									label={_t('First Name')}
										value={props.userProfileForm.firstName
												|| props.signedInUserData.firstName}
										onChange={props.updateFormField}
									/>
					
								<CustomInputControl 
									id="lastName" 
									label={_t('Last Name')}
										value={props.userProfileForm.lastName
												|| props.signedInUserData.lastName}
										onChange={props.updateFormField}
									/>
					
								<CustomInputControl 
									id="password" 
									label={_t('New Password')}
										value={props.userProfileForm.password
												|| props.signedInUserData.password}
										onChange={props.updateFormField} 
									type="password"
									optional={true}
									/>
								
								<CustomInputControl 
									id="repeatPassword" 
									label={_t('Repeat Password')}
									value={props.userProfileForm.repeatPassword
												|| props.signedInUserData.repeatPassword}
										onChange={props.updateFormField} 
									type="password"
									optional={!props.userProfileForm.password}
									/>

								{
									props.inProgress === userActions.IN_PROGRESS_UPDATE_PROFILE

									? 
										<LinearProgress/>

									:
										<Link 
											to="/"
											className={props.classes.link}>
												<Button 
													id="submitButton"
													fullWidth 
													variant="contained" 
													color="primary" 
													className={props.classes.submit} 
													onClick={()=>
														props.updateProfile(props.userProfileForm)}> 
															{_t('Submit')}
												</Button>
										</Link>
								}

								<Link 
									to="/"
									className={props.classes.link}>
										<Button 
											fullWidth 
											variant="contained" 
											color="secondary" 
											className={props.classes.submit}> 
												{_t('Cancel')}
										</Button>
								</Link>

							</React.Fragment>
						</form>
					</Paper>
				</main>

			// if user profile form is not yet initialized
			: <React.Fragment/>
			
		// if user is logged out or session is expired
		: <Redirect to="/signin"/>
	}
}


// connect the edit user profile form to state 
const ProfileForm = connect(
	state => ({
		signedIn: state.signedIn,
		userProfileForm: state.userProfileForm,
		signedInUserData: state.signedInUserData,
		inProgress: state.inProgress,
		language: state.language
	}),
	dispatch => ({
		initProfileForm: () => dispatch(userActions.initProfileForm()),

		updateFormField: (id, value) => 
			dispatch(userActions.updateFormField(id, value, "userProfileForm")),

		updateProfileImg: (username, path, files) => 
			dispatch(userActions.addUserImg(username, path, files[0])),

		updateProfile: props => dispatch(userActions.updateProfile(props))
	})	
)(withStyles(styles)(_ProfileForm))



export { _ProfileForm, ProfileForm }