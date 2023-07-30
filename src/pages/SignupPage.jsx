import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

import "../styles/SignPage.css";

const api = process.env.REACT_APP_DATABASE_URL;

export default function SignupPage() {
  const [responseErrors, setResponseErrors] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth", null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // convert email to lowercase
    data.email = data.email.toLowerCase();

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
          setUserAuth({
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
    // add class to body for styling
    document.body.classList.add("signup-page-body");
    // remove class when component unmount
    return () => {
      document.body.classList.remove("signup-page-body");
    };
  });

  return (
    <div className="signup-container">
      <h1 className="text-xl my-5 font-semibold">Register</h1>
      <RegisterForm onSubmit={onSubmit} responseErrors={responseErrors} page="signup" />
      <p className="signin-hint">
        If you already have an account, please proceed to <a href="/signin">sign in</a>.
      </p>
      {authenticated && (
        <p className="sign-success">Sign up successfully. Redirecting to home page...</p>
      )}
    </div>
  );
}
