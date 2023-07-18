import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const api = process.env.REACT_APP_DATABASE_URL;

export default function SigninPage() {
  const { register, handleSubmit } = useForm();
  const [responseErrors, setResponseErrors] = useState(null);
  const [JWT, setJWT] = useLocalStorage("JWT", null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  // function to toggle password visibility
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleClickShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onSubmit = async (data) => {
    try {
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
        // save JWT token to local storage
        setJWT(jsonData.JWTtoken);
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

  return (
    <div>
      <h1>Login</h1>
      <p>{responseErrors && "Invalid email or password"}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="email@gmail.com"
            type="text"
            name="email"
            onInput={() => setResponseErrors(null)}
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
            placeholder="password"
            name="password"
            type={passwordVisibility ? "text" : "password"}
            onInput={() => setResponseErrors(null)}
            {...register("password", { required: true })}
          />
          {passwordVisibility ? (
            <i onClick={handleClickShowPassword}>
              <VisibilityOffIcon />
            </i>
          ) : (
            <i onClick={handleClickShowPassword}>
              <VisibilityIcon />
            </i>
          )}
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <p>
        Don't have an account? Please proceed to{" "}
        <a href="/signup" style={{ color: "red" }}>
          sign up
        </a>
        .
      </p>
      {authenticated && <p>Sign in successfully. Redirecting to home page...</p>}
    </div>
  );
}
