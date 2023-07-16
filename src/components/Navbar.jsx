import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [display, setDisplay] = useState(false);

  return (
    <nav>
      <div className="flex justify-between content-center p-2 shadow-lg">
        <NavLink to="/" className="w-1/6 text-left pl-8">
          Logo
        </NavLink>
        <ul class="flex w-4/6 justify-between pr-8">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li
            onMouseEnter={() => {
              setDisplay(true);
            }}
            onMouseLeave={() => {
              setDisplay(false);
            }}
          >
            Pets
            <ul style={{ display: display ? "block" : "none" }}>
              <li>
                <NavLink to="/pets?status=lost">Lost Pets</NavLink>
              </li>
              <li>
                <NavLink to="/pets?status=found">Found Pets</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/petResource">Pet Resources</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/">notification</NavLink>
          </li>
          <li>
            <NavLink to="/personalDetail">personal</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
