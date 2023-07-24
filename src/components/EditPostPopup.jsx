import React, { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";
import { useLocalStorage } from "react-use";
import { useUserPost, useUserPostDispatch } from "../contexts/UserPostContext";

const api = process.env.REACT_APP_DATABASE_URL;

function EditPostPopup({ trigger, close, post, update }) {
  const colorOptions = ["Yellow", "Black", "White", "Brown", "Grey", "Multi", "Cream"];

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

  const breedOptions = [
    {
      Dog: ["Dachshund", "Poodle", "Labrador", "Pug", "Other"]
    },
    {
      Cat: ["Persian", "Siamese", "Bengal", "Ragdoll", "Other"]
    },
    {
      Bird: ["Cockatiel", "Budgerigar", "Lovebird", "Parrot", "Other"]
    },
    {
      Rabbit: ["Dutch", "Lionhead", "Mini Lop", "Netherland Dwarf", "Other"]
    },
    {
      Other: ["Other"]
    }
  ];

  const [selectedColor, setSelectedColor] = useState(post.color);
  const [suburb, setSuburb] = useState(post.suburb);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const userPostDispatch = useUserPostDispatch();
  const [contactInfo, setContactInfo] = useState(post.contactInfo);
  const [selectedStatus, setSelectedStatus] = useState(post.status);
  const [selectedSpecies, setSelectedSpecies] = useState(post.species);
  const [selectedBreed, setSelectedBreed] = useState(post.breed);
  const userPost = useUserPost();

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

  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.value;
    setDescription(descriptionValue);
  };

  const handleContactInfoChange = (event) => {
    const contactInfoValue = event.target.value;
    setContactInfo(contactInfoValue);
  };

  const handleStatusChange = (event) => {
    const statusValue = event.target.value;
    setSelectedStatus(statusValue);
  };

  const handleSpeciesChange = (event) => {
    const speciesValue = event.target.value;
    setSelectedSpecies(speciesValue);
    setSelectedBreed("");
  };

  const breedOptionsForSelectedSpecies = breedOptions.find((option) =>
    option.hasOwnProperty(selectedSpecies)
  );

  const breedOptionsList =
    breedOptionsForSelectedSpecies && breedOptionsForSelectedSpecies[selectedSpecies];

  const handleBreedChange = (event) => {
    const breedValue = event.target.value;
    setSelectedBreed(breedValue);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        title: title,
        suburb: suburb,
        status: selectedStatus,
        description: description,
        contactInfo: contactInfo,
        color: selectedColor,
        breed: selectedBreed,
        species: selectedSpecies
      };
      userPostDispatch({ type: "update", blogIdToUpdate: post._id, updatedBlog: data });
      const response = await fetch(`${api}/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userAuth.jwt}`
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      alert("Post has been updated.");
      window.location.reload();

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
              <FilterSelect
                label="species"
                value={selectedSpecies}
                options={speciesOptions}
                onChange={handleSpeciesChange}
                title="species" // Add the title prop for the first filter
              />
              {console.log(breedOptionsList)}

              {breedOptionsList && (
                <FilterSelect
                  label="breed"
                  value={selectedBreed}
                  options={breedOptionsList}
                  onChange={handleBreedChange}
                  title="breed" // Add the title prop for the first filter
                />
              )}
              <FilterSelect
                label="color"
                value={selectedColor}
                options={colorOptions}
                onChange={handleColorChange}
                title="color" // Add the title prop for the first filter
              />
              <label>Description</label>
              <textarea
                className="border border-gray-300 rounded-md p-2"
                value={description}
                onChange={handleDescriptionChange}
              />
              <label>ContactInfo</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={contactInfo}
                onChange={handleContactInfoChange}
              />
              <label>Status</label>
              <div className="radio-buttons flex gap-4">
                <label className="radio-button">
                  <input
                    type="radio"
                    name="status"
                    value="lost"
                    onChange={handleStatusChange}
                    checked={selectedStatus === "lost"}
                    className="hidden"
                  />
                  <span
                    className={`${
                      selectedStatus === "lost" && "bg-gray-300"
                    } py-2 px-4 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100`}
                  >
                    Lost
                  </span>
                </label>
                <label className="radio-button">
                  <input
                    type="radio"
                    name="status"
                    value="found"
                    onChange={handleStatusChange}
                    checked={selectedStatus === "found"}
                    className="hidden"
                  />
                  <span
                    className={`${
                      selectedStatus === "found" && "bg-gray-300"
                    } py-2 px-4 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-100`}
                  >
                    Found
                  </span>
                </label>
              </div>
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
      {console.log(selectedStatus)}
    </div>
  );
}

export default EditPostPopup;
