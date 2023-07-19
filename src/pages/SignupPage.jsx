import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../styles/SignPage.css";

const api = process.env.REACT_APP_DATABASE_URL;

export default function SignupPage() {
  const [responseErrors, setResponseErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useLocalStorage("userData", null);
  const navigate = useNavigate();

  // function to toggle password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  //useForm is a custom hook that allows us to register inputs and validate fields
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${api}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors?.length > 0) {
          setResponseErrors(data.errors);
        } else {
          // save user data to local storage
          setUserData({
            userId: data.userId,
            jwt: data.JWTtoken
          });
          setAuthenticated(true);
          setResponseErrors(null);
          // redirect to home page after signup done
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.body.classList.add("signup-page-body");
  });

  return (
    <div className="signup-container">
      <h1 className="text-xl my-5 font-semibold">Register</h1>
      {responseErrors &&
        // loop through the array of errors and display them
        responseErrors.map((error) => {
          return (
            <p key={error} className="errorMsg">
              {error}
            </p>
          );
        })}
      <form onSubmit={handleSubmit(onSubmit)} className="sign-from">
        <div>
          <input
            placeholder="username"
            type="text"
            name="username"
            {...register("username", {
              required: "Username is required"
            })}
          />
          {errors.username && <p className="errorMsg">{errors.username.message}</p>}
        </div>
        <div>
          <input
            placeholder="email@gmail.com"
            type="text"
            name="email"
            {...register("email", {
              required: "Email is required",
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
          <input
            placeholder="password"
            type={passwordVisibility ? "text" : "password"}
            name="password"
            {...register("password", {
              required: "Password is required",
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
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
        </div>
        <div className="password-container">
          <input
            placeholder="confirm password"
            type={confirmPasswordVisibility ? "text" : "password"}
            name="confirm_password"
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
          {errors.confirm_password && <p className="errorMsg">{errors.confirm_password.message}</p>}
        </div>
        <div>
          <button type="submit" className="sign-btn">
            Sign Up
          </button>
        </div>
      </form>
      <p className="signin-hint">
        If you already have an account, please proceed to <a href="/signin">sign in</a>.
      </p>
      {authenticated && (
        <p className="sign-success">Sign up successfully. Redirecting to home page...</p>
      )}
    </div>
  );
}
