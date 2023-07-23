import React, { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";
import { useLocalStorage } from "react-use";
import { useUserPost, useUserPostDispatch } from "../contexts/UserPostContext";

const api = process.env.REACT_APP_DATABASE_URL;

function EditPostPopup({ trigger, close, post }) {
  const colorOptions = [
    "yellow",
    "black",
    "white",
    "brown",
    "grey",
    "orange",
    "red",
    "blue",
    "green",
    "purple",
    "pink",
    "multi"
  ];
  const [selectedColor, setSelectedColor] = useState(post.color);
  const [suburb, setSuburb] = useState(post.suburb);
  const [title, setTitle] = useState(post.title);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const userPostDispatch = useUserPostDispatch();
  const userPost = useUserPost();

  // fetch user post data and save to context
  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(`${api}/posts/user`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`,
            userId: userAuth.userId
          }
        });
        const jsonData = await response.json();
        userPostDispatch({ type: "loadAll", payload: jsonData.data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserPosts();
  }, [userAuth]);

  const handleSuburbChange = (event) => {
    const suburbValue = event.target.value;
    setSuburb(suburbValue);
  };

  const handleColorChange = (event) => {
    const colorValue = event.target.value;
    setSelectedColor(colorValue);
  };

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        title: title,
        suburb: suburb
      };
      userPostDispatch({ type: "update", blogIdToUpdate: post._id, updatedBlog: data });
      const response = await fetch(`${api}/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userAuth.jwt}`
        },
        body: JSON.stringify({
          title: title,
          suburb: suburb
        })
      });
      const result = await response.json();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {trigger && post ? (
        <div
          className="popup fixed left-0 top-0 w-full h-screen bg-black bg-opacity-80 flex justify-center items-center"
          style={{ zIndex: "2000" }}
        >
          <div className="popup-inner p-16 max-w-md h-100vh bg-white ">
            <h1>Edit Post</h1>
            <form className="flex flex-col gap-4">
              <label>Title</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                onChange={handleTitleChange}
                value={title}
              />
              <label>Suburb</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={suburb}
                onChange={handleSuburbChange}
              />
              {/* <FilterSelect
                label="color"
                value={selectedColor}
                options={colorOptions}
                onChange={handleColorChange}
                title="color" // Add the title prop for the first filter
              />
              <label>Description</label>
              <textarea className='border border-gray-300 rounded-md p-2' />
              <label>ContactInfo</label>
              <input type='text' className='border border-gray-300 rounded-md p-2' />
              <label>Status</label>
              <div className="radio-buttons flex gap-4">
                <label className={`radio-button ${selectedColor === 'lost' ? 'selected' : ''}`}>
                  <input type='radio' name='status' value='lost' onChange={handleColorChange} checked={selectedColor === 'lost'} className="hidden" />
                  <span className="py-2 px-4 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100">
                    Lost
                  </span>
                </label>
                <label className={`radio-button ${selectedColor === 'found' ? 'selected' : ''}`}>
                  <input type='radio' name='status' value='found' onChange={handleColorChange} checked={selectedColor === 'found'} className="hidden" />
                  <span className="py-2 px-4 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100">
                    Found
                  </span>
                </label>
              </div> */}
            </form>
            <button className="btn border-2 p-3 " onClick={handleSubmit}>
              Save
            </button>
            <button className="close-btn border-2 p-3" onClick={close}>
              Close
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditPostPopup;
