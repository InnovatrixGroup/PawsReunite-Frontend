import { Dialog, Divider } from "@mui/material";

export default function AdminDialog(props) {
  const { isOpen, closeDialog, data, mode } = props;
  console.log(data);
  return (
    <Dialog open={isOpen} fullScreen>
      <button onClick={closeDialog}>Back</button>
      {mode === "editUsers" &&
        data?.map((user) => (
          <div key={user._id} className="flex justify-around">
            <span>{user.username}</span>
            <span>{user.email}</span>
            <button>delete</button>
          </div>
        ))}
      {mode === "editPosts" &&
        data?.map((post) => (
          <div key={post._id} className="flex justify-around">
            <span>{post.title}</span>
            <span>{post.createdAt}</span>
            <button>delete</button>
          </div>
        ))}
    </Dialog>
  );
}
