import { React, withStyles, connect, _t, Paper, Typography } from "../../imports.jsx"
import styles from "../style.jsx"

export const _Home = props =>
	<main className={props.classes.main}>
		<Paper 
			className={props.classes.paper}>
				<Typography 
					component="h1" 
					variant="h5" 
					gutterBottom> 
						{`${_t('Welcome')} ${props.signedInUserData.firstName} ${props.signedInUserData.lastName}`} 
				</Typography>
						
				<Typography 
					component="p" 
					variant="body2"> 
						{_t('This is the home page of the couchdb-react boilerplate preview')}.
				</Typography>
		</Paper>
	</main>


export const Home = connect(
	state => ({
		signedInUserData: state.signedInUserData,
	})
)(withStyles(styles)(_Home))
