import { createContext, useContext, useReducer } from "react";

const initialFilterList = [{ species: "" }, { breed: "" }, { color: "" }, { suburb: "" }];

const filterReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];

  switch (instructions.type) {
    case "reset":
      return initialFilterList;
    case "update":
      //   let newState = { stateEditable, ...instructions.payload };
      return stateEditable.map((filter) => ({
        ...filter,
        ...instructions.newFilter
      }));
    default:
      console.log("Invalid instruction type received, it was: " + instructions.type);
      return previousState;
  }
};

// DataBlueprintWeWantGlobally = createContext(someDefaultData)
export const FilterDataContext = createContext(null);
export const FilterDispatchContext = createContext(null);

export function useFilterData() {
  return useContext(FilterDataContext);
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}

export default function FilterProvider(props) {
  const [userData, userDispatch] = useReducer(filterReducer, initialFilterList);

  return (
    <FilterDataContext.Provider value={userData}>
      <FilterDispatchContext.Provider value={userDispatch}>
        {props.children}
      </FilterDispatchContext.Provider>
    </FilterDataContext.Provider>
  );
}
