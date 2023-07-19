import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../styles/SignPage.css";

const api = process.env.REACT_APP_DATABASE_URL;

export default function SigninPage() {
  const { register, handleSubmit } = useForm();
  const [responseErrors, setResponseErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useLocalStorage("userData", null);
  const navigate = useNavigate();

  // function to toggle password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = async (data) => {
    try {
      // convert email to lowercase
      data.email = data.email.toLowerCase();

      const response = await fetch(`${api}/users/signin`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        validateStatus: false,
        body: JSON.stringify(data)
      });

      const jsonData = await response.json();

      if (response.ok) {
        // save user data to local storage
        setUserData({
          userId: jsonData.userId,
          jwt: jsonData.JWTtoken
        });
        setAuthenticated(true);
        setResponseErrors(null);

        // redirect to home page after signin done
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setResponseErrors(jsonData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.classList.add("signin-page-body");
  });

  return (
    <div className="signin-container">
      <h1 className="text-xl my-5 font-semibold">Login</h1>
      <p className="errorMsg">{responseErrors && "Invalid email or password"}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="sign-from">
        <div>
          <input
            placeholder="email@gmail.com"
            type="text"
            name="email"
            onInput={() => setResponseErrors(null)}
            {...register("email", { required: true })}
          />
        </div>
        <div className="password-container">
          <input
            placeholder="password"
            name="password"
            type={passwordVisibility ? "text" : "password"}
            onInput={() => setResponseErrors(null)}
            {...register("password", { required: true })}
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
        <div>
          <button type="submit" className="sign-btn">
            Sign In
          </button>
        </div>
      </form>
      <p className="signin-hint">
        Don't have an account? Please proceed to <a href="/signup">sign up</a>.
      </p>
      {authenticated && (
        <p className="sign-success">Sign in successfully. Redirecting to home page...</p>
      )}
    </div>
  );
}
