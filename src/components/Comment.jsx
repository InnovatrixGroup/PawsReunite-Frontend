import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const api = process.env.REACT_APP_DATABASE_URL;

function Comment(props) {
  const comments = props.comments;

  return (
    <div className="comments-container">
      {comments &&
        comments.map((comment) => (
          <div className="comment flex gap-5" key={comment._id}>
            <div className="flex items-center mb-4">
              <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {comment.userId.username.charAt(0).toUpperCase()}
                </Avatar>
                <p className="text-xs">{comment.userId.username}</p>
              </div>
              <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                <div>{comment.content}</div>

                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comment;
