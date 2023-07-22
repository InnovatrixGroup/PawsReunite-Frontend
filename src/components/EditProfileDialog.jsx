import { forwardRef, useEffect } from "react";
import { Dialog, Slide, Divider } from "@mui/material";
import RegisterForm from "./RegisterForm";
import ClearIcon from "@mui/icons-material/Clear";
import "../styles/EditProfileDialog.css";

export default function EditProfileDialog(props) {
  const { isOpen, closeDialog, userDetail } = props;
  // const Transition = forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const onSubmit = (data) => {
    console.log(data);
  };

  const responseErrors = null;

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullScreen>
      <div className="edit-profile-header">
        <ClearIcon onClick={closeDialog} className="close-icon" fontSize="large" />
        <h1>Edit profile</h1>
      </div>
      <Divider sx={{ boxShadow: 2 }} />
      <div className="edit-personal-info-container">
        <h1>Personal Info</h1>
        <RegisterForm
          onSubmit={onSubmit}
          responseError={responseErrors}
          userDetail={userDetail}
          page="edit-profile"
        />
      </div>
    </Dialog>
  );
}
