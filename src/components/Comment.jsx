import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useLocalStorage } from "react-use";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

function Comment(props) {
  const comments = props.comments;
  const onDelete = props.onDelete;
  const api = process.env.REACT_APP_DATABASE_URL;
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // State to keep track of the selected comment ID when confirming deletion
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  return (
    <div className="comments-container">
      {/* Mapping through comments and rendering each comment */}
      {comments &&
        comments.map((comment) => (
          <div className="comment flex gap-5 justify-between items-start" key={comment._id}>
            {/* Displaying the user avatar and username */}
            <div className="flex items-center mb-4 mr-5">
              <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                {/* Avatar with the first letter of the username as the content */}
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {comment.userId?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <p className="text-xs">{comment.userId.username}</p>
              </div>
              <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                <div>{comment.content}</div>

                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              </div>
            </div>
            {/* Displaying the delete icon for the user's own comments */}
            {comment.userId._id === userAuth?.userId && (
              <DeleteOutlineIcon
                sx={{ fontSize: "30px", marginTop: "12px", cursor: "pointer" }}
                className="hover:scale-105"
                onClick={() => {
                  setShowDeleteConfirmation(true);
                  setSelectedCommentId(comment._id);
                }}
              />
            )}
          </div>
        ))}
      {/* Rendering the DeleteConfirmDialog to confirm comment deletion */}
      <DeleteConfirmDialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          onDelete(selectedCommentId);
          setShowDeleteConfirmation(false);
        }}
      />
    </div>
  );
}

export default Comment;
