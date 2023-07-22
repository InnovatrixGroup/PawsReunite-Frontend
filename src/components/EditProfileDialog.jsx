import { useEffect, useState } from "react";
import { Dialog, Divider } from "@mui/material";
import RegisterForm from "./RegisterForm";
import ClearIcon from "@mui/icons-material/Clear";
import "../styles/EditProfileDialog.css";
import { set } from "react-hook-form";

const api = process.env.REACT_APP_DATABASE_URL;

export default function EditProfileDialog(props) {
  const { isOpen, closeDialog, userDetail, setUserDetail, userAuth, setUserAuth } = props;

  const [responseErrors, setResponseErrors] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const onSubmit = async (data) => {
    // delete any fields that the user did not change
    for (let key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    if (data.email) {
      data.email = data.email.toLowerCase();
    }

    // only send request if there is data to update
    if (Object.keys(data).length) {
      const response = await fetch(`${api}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userAuth.jwt}`
        },
        validateStatus: false,
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (response.ok) {
        // update user detail state
        data.username && setUserDetail({ ...userDetail, username: responseData.username });
        data.email && setUserDetail({ ...userDetail, email: responseData.email });

        // update user auth state
        setUserAuth({ ...userAuth, jwt: responseData.newJWT });

        // set update success to true
        setUpdateSuccess(true);
      } else {
        setResponseErrors([responseData.error]);
      }
    }
  };

  useEffect(() => {
    setUpdateSuccess(false);
  }, []);

  return (
    <Dialog
      open={isOpen}
      // onClose={() => {
      //   setUpdateSuccess(false);
      //   // closeDialog();
      // }}
      fullScreen
      className="edit-profile-dialog"
    >
      <div className="edit-profile-header">
        <ClearIcon
          onClick={() => {
            closeDialog();
            setUpdateSuccess(false);
          }}
          className="close-icon"
          fontSize="large"
        />
        <h1>Edit profile</h1>
      </div>
      <Divider sx={{ boxShadow: 2 }} />
      <div className="edit-profile-bg-container">
        <div className="edit-personal-info-container">
          <h1>Personal Info</h1>
          <RegisterForm
            onSubmit={onSubmit}
            responseErrors={responseErrors}
            userDetail={userDetail}
            onChange={(e) => {
              setResponseErrors(null);
              setUpdateSuccess(false);
            }}
            page="edit-profile"
          />
          {updateSuccess && <p className="update-success">Update successful! </p>}
        </div>
        <div className="hidden lg:block lg-bg"></div>
      </div>
    </Dialog>
  );
}
