import { React, withStyles, connect, _t, Paper, Typography } from "../../imports.jsx"
import styles from "../style.jsx"

export const _Landing = props =>
    <main className={props.classes.main}>
        <Paper 
            className={props.classes.paper}>

                <Typography 
                    component="h1" 
                    variant="h5" 
                    gutterBottom> 
                        {`${_t('A CouchDB-React boilerplate preview')}!`} 
                </Typography>
                

                <Typography 
                    component="p" 
                    variant="body2"> 
                        {_t('In this phase, you can only sign up, sign in and edit your user profile')}.
                </Typography>
        </Paper>
    </main>


export const Landing = connect()(withStyles(styles)(_Landing))
