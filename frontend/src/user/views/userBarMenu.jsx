import { React, connect, _t, Button, withStyles, Avatar, LockOutlinedIcon, Link } 
	from "../../imports.jsx"

import styles from "../style.jsx"
import * as userActions from "../actions.jsx"


class _UserBarMenu extends React.Component {
	render(){
		const props = this.props

		return props.signedIn
		
			? <React.Fragment>
				<Link 
					to={"/profile"} 
					className={props.classes.link}>
						<Avatar 
							className={props.classes.avatar} 
							src={props.signedInUserData.imageData}>
								<LockOutlinedIcon />
						</Avatar>
				</Link>

				<Button 
					id="signoutButton"
					size="medium" 
					color="inherit" 
					className={props.classes.margin}
					onClick={() => props.signOut(
								props.signedInUserData.firstName, 
								props.signedInUserData.lastName
							)}>
						{_t("Sign out")}
				</Button>
			</React.Fragment>
	
			: <Link 
					to="/signin"
					className={props.classes.link}>
						<Button 
							size="medium" 
							color="inherit" 
							className={props.classes.margin}>
								{_t("Sign in")}
						</Button>
			</Link>
	}
}


// connect the user bar to state
const UserBarMenu = connect(
	state => ({
		language: state.language,
		signedIn: state.signedIn,
		signedInUserData: state.signedInUserData
	}),
	dispatch => ({
		signOut: (firstName, lastName) => dispatch(userActions.signOut(firstName, lastName))
	})
)(withStyles(styles)(_UserBarMenu))



export { _UserBarMenu, UserBarMenu }