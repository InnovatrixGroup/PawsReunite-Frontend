import logo from "../pics/logo.png";
import { NavLink } from "react-router-dom";
import AdminDialog from "../components/AdminDialog";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
const { useState, useEffect } = require("react");

const api = process.env.REACT_APP_DATABASE_URL;

export default function AdminPage() {
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [editPostDialog, setEditPostDialog] = useState(false);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userDetail, setUserDetail] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserAuth(null);
    alert("You have logged out.");
    // navigate to landing page automatically after logout
    navigate("/welcome");
  };

  const openEditUserDialog = () => {
    setEditUserDialog(true);
  };
  const closeEditUserDialog = () => {
    setEditUserDialog(false);
  };

  const openEditPostDialog = () => {
    setEditPostDialog(true);
  };
  const closeEditPostDialog = () => {
    setEditPostDialog(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${api}/users/${userAuth.userId}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`
          }
        });
        const jsonData = await response.json();
        setUserDetail(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [userAuth]);

  // useEffect(() => {
  //   if (userDetail?.role !== "admin") {
  //     navigate("/");
  //   }
  // }, [userDetail]);

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch(`${api}/users/all`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`
          },
          validateStatus: false
        });
        const jsonData = await response.json();
        setAllUsers(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [userAuth]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await fetch(`${api}/posts`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`
          },
          validateStatus: false
        });
        const jsonData = await response.json();
        setAllPosts(jsonData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPosts();
  }, [userAuth, allPosts]);

  return (
    <>
      <nav>
        <ul className="navbar flex justify-between items-center bg-gray-200 py-2 px-6 fixed top-0 w-full max-w-7xl">
          <li>
            <NavLink className="navbar__logo" to="/">
              <img src={logo} alt="logo" className="w-10" />
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col">
        <h1>Admin</h1>
        <button onClick={openEditUserDialog}>Users Management</button>
        <AdminDialog
          isOpen={editUserDialog}
          closeDialog={closeEditUserDialog}
          data={allUsers}
          setAllUsers={setAllUsers}
          userAuth={userAuth}
          mode="editUsers"
        />
        <button onClick={openEditPostDialog}>Posts Management</button>
        <AdminDialog
          isOpen={editPostDialog}
          closeDialog={closeEditPostDialog}
          data={allPosts}
          setAllPosts={setAllPosts}
          userAuth={userAuth}
          mode="editPosts"
        />
      </div>
    </>
  );
}
