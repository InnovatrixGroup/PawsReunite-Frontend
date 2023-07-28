import { Dialog, Divider } from "@mui/material";
const api = process.env.REACT_APP_DATABASE_URL;

export default function AdminDialog(props) {
  const { isOpen, closeDialog, data, mode, userAuth, setAllPosts, setAllUsers } = props;

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${api}/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth.jwt}`
        }
      });
      const jsonData = await response.json();

      setAllUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${userAuth.jwt}`
        }
      });
      const jsonData = await response.json();

      setAllPosts((prev) => prev.filter((post) => post._id !== id));
      alert("Post deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} fullScreen>
      <button onClick={closeDialog}>Back</button>
      {mode === "editUsers" &&
        data?.map((user) => (
          <div key={user._id} className="flex justify-around">
            <span>{user.username}</span>
            <span>{user.email}</span>
            <button onClick={() => handleDeleteUser(user._id)}>delete</button>
          </div>
        ))}
      {mode === "editPosts" &&
        data?.map((post) => (
          <div key={post._id} className="flex justify-around">
            <span>{post.title}</span>
            <span>{post.createdAt}</span>
            <button onClick={() => handleDeletePost(post._id)}>delete</button>
          </div>
        ))}
    </Dialog>
  );
}
