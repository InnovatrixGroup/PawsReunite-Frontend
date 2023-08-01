import React, { useEffect, useState } from "react";
import logo from "../pics/logo.png";
import Carousel from "./Carousel";
import PostSkeleton from "./PostSkeleton";
import { Navigate, useParams } from "react-router-dom";
import Comment from "./Comment";

const api = process.env.REACT_APP_DATABASE_URL;

function Post(props) {
  const { id } = useParams();
  const postData = props.postData;
  const isSingle = props.isSingle;

  // State variables to manage the post description display
  const [showFullDescription, setShowFullDescription] = useState(false);

  // State variables for loading and redirection
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(0);

  // Function to toggle the display of full post description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Function to truncate the description text if it's too long
  const truncateDescription = (description) => {
    if (description.length > 150 && showFullDescription === false) {
      return description.slice(0, 150);
    } else {
      return description;
    }
  };

  // fetch the comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${api}/comments?postId=${postData._id}`);
      const result = await response.json();
      setNumberOfComments(result.data.length);
    };
    fetchComments();
  }, [postData, id]);

  const handleRedirectClick = () => {
    setRedirect(true);
  };

  return (
    <div className="post-container">
      {redirect && <Navigate to={`/pets/${postData._id}`} />}

      <div className="post flex flex-col">
        <div
          className="post__header flex justify-between px-3 py-2 cursor-pointer"
          onClick={handleRedirectClick}
        >
          <div className="post__header__left flex gap-3 items-center">
            <img
              src={logo}
              alt="logo pic"
              className="post__profile-pic"
              style={{ width: "25px" }}
            />
            <div className="post__title">{postData.title}</div>
          </div>
          <div className="post__header__right">
            <div className="post__status">{postData.status}</div>
          </div>
        </div>

        {/* Carousel component to display the images */}
        <Carousel images={postData.photos} handleRedirectClick={handleRedirectClick} />

        <div className="post__body p-3">
          <div className="post__bodytop flex justify-between">
            <div className="post__species text-gray-500">
              <span className="font-extrabold">Species:</span> {postData.species}
            </div>
            <div className="post__suburb text-gray-500">
              <span className="font-extrabold">Suburb:</span> {postData.suburb}
            </div>
          </div>
          <div className="post__info flex flex-col items-start">
            <div className="post__breed text-gray-500">
              <span className="font-extrabold">Breed:</span> {postData.breed}
            </div>
            <div className="color text-gray-500">
              <span className="font-extrabold">Color:</span> {postData.color}
            </div>
            <div className="contactInfo mb-3 text-gray-500">
              <span className="font-extrabold">Contact Info:</span> {postData.contactInfo}
            </div>
            <div className="description text-left mb-3">
              {/* If the post is not in the post page, truncate description, otherwise use the full description */}
              {!isSingle ? truncateDescription(postData.description) : postData.description}
              {postData.description.length > 150 && showFullDescription === false && (
                <span onClick={toggleDescription} className="text-gray-500 cursor-pointer">
                  {" "}
                  {!isSingle && "...more"}
                </span>
              )}
            </div>
            <div className="post__comments" onClick={handleRedirectClick}>
              {/* if the post is not in the post page, only show the number of the comments instead of real comments*/}
              {!isSingle && numberOfComments !== 0 && (
                <p className="cursor-pointer">View all {numberOfComments} comments</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    // </div>
  );
}

export default Post;
