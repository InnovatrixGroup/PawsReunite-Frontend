import React from "react";
import { NavLink } from "react-router-dom";
import { useFilterDispatch } from "../contexts/FilterContext";

// Dropdown component represents a submenu with two navigation links to filter pages for Lost Pets and Found Pets.
// It is designed to be used as a dropdown menu triggered by a parent menu item or button.
function Dropdown() {
  // Accessing the dispatch function from the FilterContext using the useFilterDispatch hook.
  const filerDispath = useFilterDispatch();

  // reset filter data and reload the page so the selection is cleared
  const resetFilterDataHome = () => {
    filerDispath({ type: "reset" });
    window.location.href = "/";
  };

  // reset filter data and reload the page so the selection is cleared
  const resetFilterDataPets = () => {
    filerDispath({ type: "reset" });
    window.location.href = "/pets";
  };

  return (
    <div>
      <ul className="submenu absolute  -left-3 flex flex-col items-start px-3 pb-5 pt-5 gap-3 bg-gray-200 w-40">
        <li className="hover:underline hover:underline-offset-4">
          <NavLink to="/" onClick={resetFilterDataHome}>
            Lost Pets
          </NavLink>
        </li>
        <li className="hover:underline hover:underline-offset-4">
          <NavLink to="/pets" onClick={resetFilterDataPets}>
            Found Pets
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
