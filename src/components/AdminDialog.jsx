import { Dialog, Divider } from "@mui/material";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useState } from "react";
const api = process.env.REACT_APP_DATABASE_URL;

export default function AdminDialog(props) {
  const { isOpen, closeDialog, data, mode, userAuth, setAllPosts, setAllUsers } = props;
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

  return (
    <Dialog open={isOpen} fullScreen>
      <button onClick={closeDialog}>Back</button>
      {mode === "editUsers" &&
        data &&
        data.map((user) => (
          <div key={user._id} className="flex justify-around">
            <span>{user.username}</span>
            <span>{user.email}</span>
            <button onClick={() => setShowDeleteConfirmation(true)}>delete</button>
            <DeleteConfirmDialog
              open={showDeleteConfirmation}
              onClose={() => setShowDeleteConfirmation(false)}
              onConfirm={() => handleDeletePost(user._id)}
            />
          </div>
        ))}
      {mode === "editPosts" &&
        data &&
        data.map((post) => (
          <div key={post._id} className="flex justify-around">
            <span>{post.title}</span>
            <span>{post.createdAt}</span>
            <button onClick={() => setShowDeleteConfirmation(true)}>delete</button>
            <DeleteConfirmDialog
              open={showDeleteConfirmation}
              onClose={() => setShowDeleteConfirmation(false)}
              onConfirm={() => handleDeletePost(post._id)}
            />
          </div>
        ))}
    </Dialog>
  );
}
