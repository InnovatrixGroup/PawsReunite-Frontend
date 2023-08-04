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
      let index = stateEditable.findIndex((blog) => blog._id === instructions.blogIdToUpdate);
      // copy of existing state since we can't modify it directly
      // stateEditable = [...previousState];
      // modify the copy
      // stateEditable[targetBlog] = instructions.updatedBlog;
      stateEditable[index] = { ...stateEditable[index], ...instructions.updatedBlog };
      return stateEditable;
    case "delete":
      // do some delete or filter on the previous state
      // copy of existing state since we can't modify it directly
      // stateEditable = [...previousState];
      let targetBlog = instructions.blogIdToDelete;
      // return the result
      return stateEditable.filter((blog) => blog._id !== targetBlog);
    case "create":
      // return the result;
      return [...stateEditable, instructions.newPost];
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

  return (
    <UserPostContext.Provider value={userPostData}>
      <UserPostDispatchContext.Provider value={userPostDispatch}>
        {props.children}
      </UserPostDispatchContext.Provider>
    </UserPostContext.Provider>
  );
}
