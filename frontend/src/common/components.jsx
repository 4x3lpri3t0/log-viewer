import { React, FormControl, Input, InputLabel, Avatar } from "../imports.jsx";

// Shows the user image as an avatar. When clicked, opens an "Image Upload" dialog

export const UserImageControl = (props) => (
  <React.Fragment>
    <Avatar
      className={props.classes.bigAvatar}
      src={props.src}
      onClick={() => document.getElementById("userImageInput").click()}
    />

    <Input
      id="userImageInput"
      name="userImageInput"
      type="file"
      className={props.classes.hidden}
      onChange={(e) =>
        props.onChange(props.username, e.target.value, e.target.files)
      }
    />
  </React.Fragment>
);
