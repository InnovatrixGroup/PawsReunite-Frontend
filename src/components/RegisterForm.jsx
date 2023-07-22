import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function RegisterForm(props) {
  const { onSubmit, responseErrors, page, userDetail } = props;
  //useForm is a custom hook that allows us to register inputs and validate fields
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  // function to toggle password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  // check if is signup page
  const isSignupPage = page === "signup";

  return (
    <>
      {responseErrors &&
        // loop through the array of errors and display them
        responseErrors.map((error) => {
          return (
            <p key={error} className="errorMsg">
              {error}
            </p>
          );
        })}
      <form onSubmit={handleSubmit(onSubmit)} className={`${page}-form`}>
        <div>
          {!isSignupPage && <label>Username</label>}
          <input
            placeholder="username"
            defaultValue={userDetail?.username}
            type="text"
            name="username"
            autoComplete="username"
            {...register("username", {
              required: isSignupPage && "Username is required"
            })}
          />
          {errors.username && <p className="errorMsg">{errors.username.message}</p>}
        </div>
        <div>
          {!isSignupPage && <label>Email</label>}
          <input
            placeholder="email@gmail.com"
            defaultValue={userDetail?.email}
            type="text"
            name="email"
            autoComplete="email"
            {...register("email", {
              required: isSignupPage && "Email is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is not valid"
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="password-container">
          {!isSignupPage && <label>Password</label>}
          <div className="password-container-input">
            <input
              placeholder="password"
              type={passwordVisibility ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              {...register("password", {
                required: isSignupPage && "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "At least 8 characters, containing at least 1 uppercase letter and 1 lowercase letter"
                }
              })}
            />
            {passwordVisibility ? (
              <i onClick={handleClickShowPassword} className="visibility-icon">
                <VisibilityOffIcon />
              </i>
            ) : (
              <i onClick={handleClickShowPassword} className="visibility-icon">
                <VisibilityIcon />
              </i>
            )}
          </div>
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
        </div>
        {isSignupPage && (
          <div className="password-container">
            <div className="password-container-input">
              <input
                placeholder="confirm password"
                type={confirmPasswordVisibility ? "text" : "password"}
                name="confirm_password"
                autoComplete="new-password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match"
                })}
              />
              {confirmPasswordVisibility ? (
                <i onClick={handleClickShowConfirmPassword} className="visibility-icon">
                  <VisibilityOffIcon />
                </i>
              ) : (
                <i onClick={handleClickShowConfirmPassword} className="visibility-icon">
                  <VisibilityIcon />
                </i>
              )}
            </div>
            {errors.confirm_password && (
              <p className="errorMsg">{errors.confirm_password.message}</p>
            )}
          </div>
        )}
        <div>
          <button type="submit" className={`${page}-btn`}>
            {isSignupPage ? "Sign Up" : "Save profile"}
          </button>
        </div>
      </form>
    </>
  );
}
