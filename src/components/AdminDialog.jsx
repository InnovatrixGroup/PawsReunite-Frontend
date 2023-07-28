import { Dialog } from "@mui/material";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AdminNavBar from "../components/AdminNavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";

const api = process.env.REACT_APP_DATABASE_URL;

export default function AdminDialog(props) {
  const { isOpen, closeDialog, data, mode, userAuth, setAllPosts, setAllUsers, handleLogout } =
    props;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${api}/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth.jwt}`
        }
      });
      if (!response.ok) {
        throw new Error("Delete user failed");
      }

      setAllUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted");
    } catch (error) {
      console.log(error);
    }
    setShowDeleteConfirmation(false);
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth.jwt}`
        }
      });
      if (!response.ok) {
        throw new Error("Delete post failed");
      }

      setAllPosts((prev) => prev.filter((post) => post._id !== id));
      alert("Post deleted");
    } catch (error) {
      console.log(error);
    }
    setShowDeleteConfirmation(false);
  };

  useEffect(() => {
    // add class to body for styling
    document.body.classList.add("admin-page-edit-body");
    // remove class when component unmount
    return () => {
      document.body.classList.remove("admin-page-edit-body");
    };
  });

  return (
    <Dialog open={isOpen} fullScreen>
      <AdminNavBar handleLogout={handleLogout} />
      <div className="admin-page-edit-header">
        <h2>{mode === "editUsers" ? "User List" : "Post List"}</h2>
        <button onClick={closeDialog}>Back</button>
      </div>
      <div className="admin-page-edit-list">
        {mode === "editUsers"
          ? data?.map((user) => (
              <div key={user._id} className="admin-page-edit-list-item">
                <span>{user.username}</span>
                <span>{user.email}</span>
                <div className="admin-page-edit-list-item-delete">
                  <DeleteIcon
                    onClick={() => setShowDeleteConfirmation(true)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <DeleteConfirmDialog
                  open={showDeleteConfirmation}
                  onClose={() => setShowDeleteConfirmation(false)}
                  onConfirm={() => handleDeleteUser(user._id)}
                />
              </div>
            ))
          : data?.map((post) => (
              <div key={post._id} className="admin-page-edit-list-item">
                <span>{post.title}</span>
                <Moment format="YYYY-MM-DD hh:mm A">{post.createdAt}</Moment>
                <div className="admin-page-edit-list-item-delete">
                  <DeleteIcon
                    onClick={() => setShowDeleteConfirmation(true)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <DeleteConfirmDialog
                  open={showDeleteConfirmation}
                  onClose={() => setShowDeleteConfirmation(false)}
                  onConfirm={() => handleDeletePost(post._id)}
                />
              </div>
            ))}
      </div>
      <div className="admin-page-edit-list"></div>
      <Footer />
    </Dialog>
  );
}
