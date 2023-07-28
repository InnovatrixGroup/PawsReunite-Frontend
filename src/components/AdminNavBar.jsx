import logo from "../pics/logo_white.png";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminNavBar({ handleLogout }) {
  return (
    <nav>
      <ul className="navbar admin-navbar flex justify-between items-center bg-orange-900 py-3 px-6 fixed top-0 w-full max-w-7xl">
        <li>
          <NavLink className="navbar__logo" to="/">
            <img src={logo} alt="logo" className="w-10" />
          </NavLink>
        </li>
        <li>
          <LogoutIcon
            onClick={handleLogout}
            sx={{ color: "white", fontSize: "25px", cursor: "pointer" }}
            f
          />
        </li>
      </ul>
    </nav>
  );
}
