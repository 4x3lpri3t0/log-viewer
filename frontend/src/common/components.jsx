import { React, FormControl, Input, InputLabel, Avatar } from "../imports.jsx"


// A Material-UI input control with a dedicated label

export const CustomInputControl = props => {
    const {onChange, ...inputProps} = props

    return	<FormControl 
                fullWidth
                margin="normal" 
                required={!props.optional}>

                <InputLabel 
                    htmlFor={props.id}>
                        {props.label}
                </InputLabel>

                <Input 
                    {...inputProps} 
                    optional={String(props.optional)}
                    name={props.id} 
                    value={props.value || ""} 
                    onChange={e => onChange(props.id, e.target.value)} />

            </FormControl>
}


// Shows the user image as an avatar. When clicked, opens an "Image Upload" dialog

export const UserImageControl = props => 
    <React.Fragment>
        <Avatar 
            className={props.classes.bigAvatar}
            src={props.src} 
            onClick={() => document.getElementById('userImageInput').click()}/>

        <Input 
            id="userImageInput"
            name="userImageInput"
            type="file" 
            className={props.classes.hidden} 
            onChange={e => props.onChange(props.username, e.target.value, e.target.files)}/>
    </React.Fragment>