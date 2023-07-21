import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";
const api = process.env.REACT_APP_DATABASE_URL;

const initial_state = [];

const userPostReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];

  switch (instructions.type) {
    case "loadAll":
      let newState = instructions.payload;
      return newState;
    case "update":
      // let newState = { stateEditable, ...instructions.payload };
      return stateEditable;
    case "delete":
      // do some delete or filter on the previous state
      // copy of existing state since we can't modify it directly
      // stateEditable = [...previousState];
      let targetBlog = instructions.blogIdToDelete;
      // return the result
      return stateEditable.filter((blog) => blog.id !== targetBlog);
    case "create":
      // add some data to the previous state
      // return the result;
      return stateEditable;
    case "logout":
      // do some logout
      return stateEditable;
    default:
      console.log("Invalid instruction type received, it was: " + instructions.type);
      return stateEditable;
  }
};

// DataBlueprintWeWantGlobally = createContext(someDefaultData)
export const UserPostContext = createContext(null);
export const UserPostDispatchContext = createContext(null);

export function useUserPost() {
  return useContext(UserPostContext);
}

export function useUserPostDispatch() {
  return useContext(UserPostDispatchContext);
}

export default function UserPostProvider(props) {
  const [userPostData, userPostDispatch] = useReducer(userPostReducer, initial_state);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${api}/posts/user`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`,
            userId: userAuth.userId
          }
        });
        const jsonData = await response.json();
        userPostDispatch({ type: "loadAll", payload: jsonData.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  return (
    <UserPostContext.Provider value={userPostData}>
      <UserPostDispatchContext.Provider value={userPostDispatch}>
        {props.children}
      </UserPostDispatchContext.Provider>
    </UserPostContext.Provider>
  );
}