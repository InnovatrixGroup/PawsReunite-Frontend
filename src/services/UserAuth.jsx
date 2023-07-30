import { useLocalStorage } from "react-use";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const api = process.env.REACT_APP_DATABASE_URL;

// ValidateUserAuth is an async function that takes in a userAuth object
// and returns a user object if the user is authenticated
const ValidateUserAuth = async (userAuth) => {
  if (!userAuth?.userId || !userAuth?.jwt) {
    return;
  }

  try {
    const response = await fetch(`${api}/users/${userAuth.userId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userAuth.jwt}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};

// RequireAuth is a component that takes in a children component
// and returns the children component if the user is authenticated
// else it returns the WelcomePage component
const RequireAuth = () => {
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userIsLogged, setUserIsLogged] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await ValidateUserAuth(userAuth);
      userData ? setUserIsLogged(true) : setUserIsLogged(false);
    }
    fetchUser();
  }, [userAuth]);

  if (userIsLogged === null) {
    return;
  } else if (userIsLogged === false) {
    return <Navigate to="/welcome" />;
  } else {
    return <Outlet />;
  }
};

export { ValidateUserAuth, RequireAuth };
