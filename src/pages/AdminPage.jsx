import AdminDialog from "../components/AdminDialog";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import "../styles/AdminPage.css";
import AdminNavBar from "../components/AdminNavBar";

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

        // exclude current user from allUsers, a user cannot delete itself
        const allUsers = jsonData.filter((user) => user._id !== userAuth.userId);
        setAllUsers(allUsers);
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
      <AdminNavBar handleLogout={handleLogout} />
      <div className="admin-page-body">
        <h1>Admin</h1>
        <div className="admin-page-btn-container">
          <button onClick={openEditUserDialog}>Users Management</button>
          <AdminDialog
            isOpen={editUserDialog}
            closeDialog={closeEditUserDialog}
            data={allUsers}
            setAllUsers={setAllUsers}
            userAuth={userAuth}
            handleLogout={handleLogout}
            mode="editUsers"
          />
          <button onClick={openEditPostDialog}>Posts Management</button>
          <AdminDialog
            isOpen={editPostDialog}
            closeDialog={closeEditPostDialog}
            data={allPosts}
            setAllPosts={setAllPosts}
            userAuth={userAuth}
            handleLogout={handleLogout}
            mode="editPosts"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
