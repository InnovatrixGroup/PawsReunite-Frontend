// Importing necessary components and modules from Material-UI, React, and other files
import { Dialog } from "@mui/material";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AdminNavBar from "../components/AdminNavBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from "react-moment";

// Getting the API base URL from the environment variable
const api = process.env.REACT_APP_DATABASE_URL;

// Function to delete a user using the API
const deleteUser = async (id, userAuth) => {
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
  } catch (error) {
    console.log(error);
  }
};

// Function to delete a post using the API
const deletePost = async (id, userAuth) => {
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
  } catch (error) {
    console.log(error);
  }
};

// Component to render each item in the list with a delete option
const ListItem = ({ item, onDelete }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div key={item._id} className="admin-page-edit-list-item">
      <span>{item.username || item.title}</span>
      {item.email && <span>{item.email}</span>}

      {/* Displaying the creation date and time using Moment component */}
      {item.createdAt && <Moment format="YYYY-MM-DD hh:mm A">{item.createdAt}</Moment>}
      <div className="admin-page-delete-icon">
        <DeleteIcon
          onClick={handleDeleteClick}
          style={{ cursor: "pointer" }}
          className="hover:scale-110"
        />
      </div>
      <div className="admin-page-delete-confirm">
        <DeleteConfirmDialog
          open={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => {
            onDelete(item._id);
            setShowDeleteConfirmation(false);
          }}
        />
      </div>
    </div>
  );
};

// Component to render the main admin dialog
export function AdminDialog(props) {
  const { isOpen, closeDialog, data, mode, userAuth, setAllPosts, setAllUsers, handleLogout } =
    props;
  // const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteUser = async (id) => {
    await deleteUser(id, userAuth);
    setAllUsers((prev) => prev.filter((user) => user._id !== id));

    alert("User deleted");
    // setShowDeleteConfirmation(false);
  };

  const handleDeletePost = async (id) => {
    await deletePost(id, userAuth);
    setAllPosts((prev) => prev.filter((post) => post._id !== id));

    alert("Post deleted");
    // setShowDeleteConfirmation(false);
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
    <Dialog open={isOpen} fullScreen classes={{ root: "admin-page-dialog" }}>
      {/* Rendering the AdminNavBar component with the logout handler */}
      <AdminNavBar handleLogout={handleLogout} />
      <div className="admin-page-edit-header">
        <h2>{mode === "editUsers" ? "User List" : "Post List"}</h2>
        <button onClick={closeDialog}>Back</button>
      </div>

      {/* Rendering the list of users or posts based on the mode */}
      <div className="admin-page-edit-list">
        {mode === "editUsers"
          ? data?.map((user) => <ListItem key={user._id} item={user} onDelete={handleDeleteUser} />)
          : data?.map((post) => (
              <ListItem key={post._id} item={post} onDelete={handleDeletePost} />
            ))}
      </div>
      <Footer />
    </Dialog>
  );
}

export function AdminEditList(props) {
  const { mode, data, setAllUsers, setAllPosts, userAuth } = props;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteUser = async (id) => {
    await deleteUser(id, userAuth);
    setAllUsers((prev) => prev.filter((user) => user._id !== id));

    alert("User deleted");
    setShowDeleteConfirmation(false);
  };

  const handleDeletePost = async (id) => {
    await deletePost(id, userAuth);
    setAllPosts((prev) => prev.filter((post) => post._id !== id));

    alert("Post deleted");
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="admin-page-edit-list">
      {mode === "editUsers"
        ? data?.map((user) => <ListItem key={user._id} item={user} onDelete={handleDeleteUser} />)
        : data?.map((post) => <ListItem key={post._id} item={post} onDelete={handleDeletePost} />)}
    </div>
  );
}
