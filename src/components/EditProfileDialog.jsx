import { forwardRef } from "react";
import { Dialog, Slide } from "@mui/material";
import RegisterForm from "./RegisterForm";
import ClearIcon from "@mui/icons-material/Clear";

export default function EditProfileDialog(props) {
  const { isOpen, closeDialog } = props;
  // const Transition = forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const onSubmit = (data) => {
    console.log(data);
  };

  const responseErrors = null;

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullScreen>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repellat? Recusandae
        temporibus adipisci aperiam eveniet cumque, iure quibusdam tenetur eligendi dolorem id
        voluptatum repellat quod vel distinctio in blanditiis quidem!
      </p>
      <ClearIcon onClick={closeDialog} className="close-icon" />
      <h1>Edit profile</h1>
      {/* <button onClick={closeDialog}>close</button> */}
      <RegisterForm onSubmit={onSubmit} responseError={responseErrors} page="edit-profile" />
    </Dialog>
  );
}
