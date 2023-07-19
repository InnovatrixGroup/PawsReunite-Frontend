import React from "react";
import { NavLink } from "react-router-dom";

function Dropdown() {
  return (
    <div>
      <ul className="submenu absolute  -left-3 flex flex-col items-start px-3 pb-5 pt-5 gap-3 bg-gray-200 w-40">
        <li>
          <NavLink to="/pets">Lost Pets</NavLink>
        </li>
        <li>
          <NavLink to="/pets">Found Pets</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
