import { AdminDialog, AdminEditList } from "../components/AdminDialog";
import { useLocalStorage } from "react-use";
import { useNavigate, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import "../styles/AdminPage.css";
import AdminNavBar from "../components/AdminNavBar";
import { Divider } from "@mui/material";
import { ValidateUserAuth } from "../services/UserAuth";

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
    setEditPostDialog(false);
  };
  const closeEditUserDialog = () => {
    setEditUserDialog(false);
  };

  const openEditPostDialog = () => {
    setEditPostDialog(true);
    setEditUserDialog(false);
  };
  const closeEditPostDialog = () => {
    setEditPostDialog(false);
  };

  // fetch current user detail
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await ValidateUserAuth(userAuth);
        // console.log(userData);

        // redirect to home page if user is not admin
        if (userData?.role !== "admin") {
          navigate("/");
        } else {
          setUserDetail(userData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [userAuth]);

  // fetch all users
  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch(`${api}/users/all`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth?.jwt}`
          },
          validateStatus: false
        });
        const jsonData = await response.json();

        // exclude current user from allUsers, a user cannot delete itself
        const allUsers = jsonData.filter((user) => user?._id !== userAuth?.userId);
        setAllUsers(allUsers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [userAuth]);

  // fetch all posts
  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await fetch(`${api}/posts`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth?.jwt}`
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

  // change button color when user switch between user and post management
  useEffect(() => {
    const userManageBtn = document.querySelector(".user-manage-btn");
    const postManageBtn = document.querySelector(".post-manage-btn");

    if (editPostDialog) {
      postManageBtn.classList.add("active");
      userManageBtn.classList.remove("active");
    } else {
      postManageBtn.classList.remove("active");
      userManageBtn.classList.add("active");
    }
  }, [editUserDialog, editPostDialog]);

  return (
    <>
      <AdminNavBar handleLogout={handleLogout} />
      <div className="admin-page-body">
        <h1>Admin</h1>
        <div className="admin-page-btn-container">
          <button onClick={openEditUserDialog} className="user-manage-btn">
            Users Management
          </button>
          <button onClick={openEditPostDialog} className="post-manage-btn">
            Posts Management
          </button>

          {/* small and medium screen only*/}
          <AdminDialog
            isOpen={editUserDialog}
            closeDialog={closeEditUserDialog}
            data={allUsers}
            setAllUsers={setAllUsers}
            userAuth={userAuth}
            handleLogout={handleLogout}
            mode="editUsers"
          />
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

        {/* large screen only*/}
        <Divider orientation="vertical" classes={{ root: "admin-page-divider" }} />
        <div className="admin-page-list-lg">
          <AdminEditList
            data={editPostDialog ? allPosts : allUsers}
            setAllUsers={setAllUsers}
            setAllPosts={setAllPosts}
            userAuth={userAuth}
            mode={editPostDialog ? "editPosts" : "editUsers"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
