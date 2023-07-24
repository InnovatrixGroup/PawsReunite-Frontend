import { Skeleton } from "@mui/material";
import React from "react";

function PostSkeleton({ num }) {
  return Array(num)
    .fill(0)
    .map((item) => (
      <div className="post-skeleton flex flex-col justify-between">
        <div className="post-skeleton__header flex justify-between">
          <div className="header_left flex-1">
            <Skeleton width="30%" height={32} />
            {/* Adjust the width and height as per your design */}
          </div>
          <div className="header_right flex-1 self-end">
            <Skeleton width="30%" height={32} />
          </div>
        </div>
        <div className="post-skeleton__image">
          <Skeleton
            variant="rectangular"
            width="100%"
            height={384}
            style={{ marginBottom: "15px" }}
          />
          {/* Adjust the height as per your design */}
        </div>
        <div className="post-skeleton__info">
          <Skeleton width="50%" height={32} />
        </div>
        <div className="post-skeleton__info">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={32} />
          ))}
        </div>
      </div>
    ));
}

export default PostSkeleton;
