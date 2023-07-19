import { createContext, useContext, useReducer } from "react";

const initial_state = [
  {
    posts: null
  }
];

const userReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];

  switch (instructions.type) {
    case "update":
      //   let newState = { stateEditable, ...instructions.payload };
      return;
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
      return previousState;
    case "logout":
      // do some logout
      return;
    default:
      console.log("Invalid instruction type received, it was: " + instructions.type);
      return previousState;
  }
};

// DataBlueprintWeWantGlobally = createContext(someDefaultData)
export const UserDataContext = createContext(null);
export const UserDispatchContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}

export default function UserProvider(props) {
  const [userData, userDispatch] = useReducer(userReducer, initial_state);

  return (
    <UserDataContext.Provider value={userData}>
      <UserDispatchContext.Provider value={userDispatch}>
        {props.children}
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}
