# PawsReunite

[Click here](https://github.com/InnovatrixGroup/paws-reunite-frontend) to access the GitHub Repository project Frontend.

[Click here](https://github.com/InnovatrixGroup/PawsReunite-Backend) to access the GitHub Repository project Backend.

[Click here](https://paws-reunite.netlify.app/) to access the Netlify deployed website.

# All libraries used in this app

### Dependencies

1. `@emotion/react` and `@emotion/styled`: Emotion is a popular CSS-in-JS library that allows you to write CSS styles as JavaScript objects. It provides a more intuitive and powerful way to manage styles in React components.

2. `@mui/icons-material`, `@mui/joy`, and `@mui/material`: These are part of the Material-UI library, a popular UI framework for React that implements the Material Design guidelines. `@mui/material` includes core components, `@mui/icons-material` provides Material Design icons, and `@mui/joy` is the Joyful edition of Material-UI, which includes additional components. Like the personal icon, notification icon, delete icon and part of carousel are all from this library.

3. `@testing-library/jest-dom`, `@testing-library/react`, and `@testing-library/user-event`: These are testing utilities provided by the Testing Library, that was the default dependencies from the react installation, which is a set of tools to help you write more maintainable and reliable tests for React components.

4. `libphonenumber-js`: A library that provides phone number parsing, validation, and formatting capabilities. It allows you to work with phone numbers in a consistent and standardized way. For example, the number could be +61 0433 564 756, 0433 564 756, (02) 8888 8475 or +61 2 8888 8475. All those numbers are valid.

5. `react`: The core library for building user interfaces in React applications.

6. `react-dom`: Provides DOM-specific methods that can be used at the top level of a web application to interact with the DOM.

7. `react-hook-form`: A library for managing form state in React applications. It simplifies form handling and validation by providing hooks and utilities. It provides easier way to validate each input of the form without using too much state variable.

8. `react-loading-skeleton`: A library that allows you to easily create loading placeholders (skeletons) for your components to improve the user experience during data fetching. During data fetching or when the internet speed is slow, the pages will render basic structure instead of spinning wheel or empty pages.

9. `react-moment`: A library that provides utilities for parsing, manipulating, and formatting dates and times in React applications using the Moment.js library.

10. `react-router-dom`: A library that provides routing capabilities for React applications, allowing you to define and handle different routes within your application.

11. `react-scripts`: A set of scripts and configurations for running React applications. It includes development and build scripts, among other useful tools.

12. `react-select`: A flexible and customizable select input component for React applications. It allows you to create dropdown menus with various options and styles.

13. `react-spinners`: A library that provides a collection of loading spinners and animations for React applications. It is useful for indicating loading or processing states.

14. `react-use`: A library that provides various useful React hooks for common tasks, such as handling local storage, media queries, and other functionalities. In this app, the local storage will store user detail like userId and JWT.

15. `web-vitals`: A library that collects and reports web vitals metrics, which are essential indicators of user experience on the web. It helps you measure and optimize the performance of your web application.

Dev Dependencies:

1. `eslint`, `prettier`, `lint-staged`: These are development dependencies used for code linting and formatting. ESLint is a widely used linter that helps identify and fix common errors in your code. Prettier is a code formatter that enforces consistent code style. `lint-staged` is used in combination with Husky to run linting and formatting on staged files before committing.

2. `husky`: A tool that allows you to define Git hooks in your project. In this case, it's used to run `lint-staged` on pre-commit, ensuring that code is properly formatted before it's committed.

3. `tailwindcss`: A popular utility-first CSS framework that allows you to quickly build custom designs by composing utility classes. It provides a set of pre-defined CSS classes for common styles.

# Code Flow Control

## 1. Conditional Rendering: Use conditional statements to render different components or content based on certain conditions. For example:

```javascript
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
```

From the code, if the post belongs to home page, the description will be truncated based on the length of the description. If it's a single post page, will render full description. Same as the comments, only render how many comments each post have on the home page, but on the single post page, all comments will be displayed under post.

Example 2:

```javascript
const isUserPost = post && post.userId === userAuth.userId;

{
  isUserPost && (
    <div className="single__post_funcation flex justify-end px-3 gap-4 mb-8 xs:justify-between">
      <button
        className="single__post_funcation_btn bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl hover:bg-red-800"
        onClick={() => setIsEdit(true)}
      >
        Edit
      </button>
      <button
        className="single__post_funcation_btn  bg-orange-900 text-white border px-16 xs:flex-1 xs:px-0 py-2 font-light rounded-xl hover:bg-red-800"
        onClick={() => setShowDeleteConfirmation(true)}
      >
        Delete
      </button>
    </div>
  );
}
```

You can tell from above code, Edit and Delete button only render when the post is created by same user.

## 2. Props and State: Use props and state to pass data between parent and child components, allowing you to control the flow of data and actions. For example:

```javascript
<div className="posts-container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
  {posts.length > 0 && posts.map((post) => <Post key={post._id} postData={post} />)}
</div>
```

```javascript
function Post(props) {
  const { id } = useParams();
  const postData = props.postData;
  const isSingle = props.isSingle;

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
  );
}
```

Fetching the postData from home page and passing through props to POST component to render the post information.

## 3. Event Handling: Use event handlers to handle user interactions and update state accordingly. For example:

```javascript
// function to toggle password visibility
const [passwordVisibility, setPasswordVisibility] = useState(false);
const handleClickShowPassword = () => {
  setPasswordVisibility(!passwordVisibility);
};

<div className="password-container">
  <div className="password-container-input">
    <input
      placeholder="password"
      name="password"
      type={passwordVisibility ? "text" : "password"}
      onInput={() => setResponseErrors(null)}
      {...register("password", { required: true })}
    />
    {passwordVisibility ? (
      <i onClick={handleClickShowPassword} className="visibility-icon">
        <VisibilityOffIcon />
      </i>
    ) : (
      <i onClick={handleClickShowPassword} className="visibility-icon">
        <VisibilityIcon />
      </i>
    )}
  </div>
</div>;
```

From the above code, password visibility only changed when user click the icon.

## 4. React Router: Use React Router to control the flow of navigation in app, managing different routes and rendering components accordingly. For example:

```javascript
import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PetPostsPage from "./pages/pets/PetPostsPage";
import SinglePostPage from "./pages/pets/SinglePostPage";
import ContactPage from "./pages/ContactPage";
import PetResourcePage from "./pages/PetResourcePage";
import PersonalDetailPage from "./pages/PersonalDetailPage";
import AdminPage from "./pages/AdminPage";
import { RequireAuth } from "./services/UserAuth";

function App() {
  return (
    <div className="App max-w-7xl mx-auto">
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* below routes only allow signed-in users to visit */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets" element={<Outlet />}>
              <Route index element={<PetPostsPage />} />
              <Route path=":id" element={<SinglePostPage />} />
            </Route>
            <Route path="/petResource" element={<PetResourcePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/personalDetail" element={<PersonalDetailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
export default App;
```

Welcome, signin and signup are out of RequireAuth Route, the rest of pages need authentication to render.

## 5. Context: Use Context to create a global state that can be accessed by all components in the application, avoiding prop drilling. It's useful for managing app-wide data that needs to be shared across multiple components. For example:

```javascript
import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";
const api = process.env.REACT_APP_DATABASE_URL;

const initial_state = [];

const userPostReducer = (previousState, instructions) => {
  let stateEditable = [...previousState];

  switch (instructions.type) {
    case "loadAll":
      let newState = instructions.payload;
      return newState;
    case "update":
      let index = stateEditable.findIndex((blog) => blog._id === instructions.blogIdToUpdate);
      // copy of existing state since we can't modify it directly
      // stateEditable = [...previousState];
      // modify the copy
      // stateEditable[targetBlog] = instructions.updatedBlog;
      stateEditable[index] = { ...stateEditable[index], ...instructions.updatedBlog };
      return stateEditable;
    case "delete":
      // do some delete or filter on the previous state
      // copy of existing state since we can't modify it directly
      // stateEditable = [...previousState];
      let targetBlog = instructions.blogIdToDelete;
      // return the result
      return stateEditable.filter((blog) => blog._id !== targetBlog);
    case "create":
      // return the result;
      return [...stateEditable, instructions.newPost];
    case "logout":
      // do some logout
      return stateEditable;
    default:
      console.log("Invalid instruction type received, it was: " + instructions.type);
      return stateEditable;
  }
};

// DataBlueprintWeWantGlobally = createContext(someDefaultData)
export const UserPostContext = createContext(null);
export const UserPostDispatchContext = createContext(null);

export function useUserPost() {
  return useContext(UserPostContext);
}

export function useUserPostDispatch() {
  return useContext(UserPostDispatchContext);
}

export default function UserPostProvider(props) {
  const [userPostData, userPostDispatch] = useReducer(userPostReducer, initial_state);

  return (
    <UserPostContext.Provider value={userPostData}>
      <UserPostDispatchContext.Provider value={userPostDispatch}>
        {props.children}
      </UserPostDispatchContext.Provider>
    </UserPostContext.Provider>
  );
}
```

```javascript
const userPostData = useUserPost();
const userPostDispatch = useUserPostDispatch();
```

Create userPost context, call this context when user want to access their post data or manipulate the data (create, update, delete, filter ...)

# Apply Object oriented principles/patterns and break pages into small components for maintainability.

## 1. Create Post component to render every single post in this app, make it more maintainable whether styling or Post data access

```javascript
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
  );
}
export default Post;
```

## 2. This delete confirm dialog component will be used everytime user want to delete something like user personal post or comments.

```javascript
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

function DeleteConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { padding: "12px", borderRadius: "20px" } }}
      classes={{ root: "delete-confirm-dialog" }}
    >
      <DialogTitle>Delete?</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;
```

## 3. This FilterSelect component is used for filtering posts based on different kind of fields, it could be species, breed, color or suburb.

```javascript
import React from "react";

// FilterSelect component represents a select element with options for filtering.
const FilterSelect = ({ label, value, options, onChange }) => {
  return (
    <select
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
```

## 4. This carousel component is used to display a set of images in a carousel format

```javascript
import React, { useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Navigate } from "react-router-dom";

function Carousel(props) {
  const images = props.images;

  const handleRedirectClick = props.handleRedirectClick;

  // State to keep track of the current image index being displayed
  const [curr, setCurr] = useState(0);

  // Function to move to the previous slide/image in the carousel
  const prevSlide = () => {
    setCurr(curr === 0 ? images.length - 1 : curr - 1);
  };

  // Function to move to the next slide/image in the carousel
  const nextSlide = () => {
    setCurr(curr === images.length - 1 ? 0 : curr + 1);
  };

  return (
    <div className="carousel-container relative w-full aspect-square  overflow-hidden sm:max-h-[384px] md:max-h-[448px] lg:max-h-[448px]">
      {/* Carousel images container with a horizontal translation to show current image */}
      <div
        className="carousel__images flex aspect-square	 transition-transform ease-out duration-500 sm:max-w-sm md:max-w-md  lg:max-w-md justify-start"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            className="w-full aspect-square	object-cover"
            key={index}
            src={image}
            alt="pet pictures"
          />
        ))}
      </div>

      {/* Buttons for navigating between images and triggering redirect on click */}
      {/* inset-0 defined by the distance of 0 pixels to the parent DIV element, on all four sides */}
      <div
        onClick={(e) => e.currentTarget === e.target && handleRedirectClick()}
        className="carousel__buttons inset-0 absolute flex items-center justify-between px-3 cursor-pointer"
      >
        <button
          onClick={prevSlide}
          className="carousel__button p-2 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white/80"
        >
          <KeyboardArrowLeftOutlinedIcon />
        </button>
        <button
          onClick={nextSlide}
          className="carousel__button p-2 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white/80"
        >
          <KeyboardArrowRightOutlinedIcon />
        </button>
      </div>

      {/* Dots for indicating the current image in the carousel */}
      <div className="carousel__dots absolute bottom-4 right-0 left-0 flex justify-center items-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 bg-gray-400 rounded-full ${
              curr === index ? "bg-gray-800 p-1" : ""
            } `}
          />
        ))}
      </div>
    </div>
  );
}
export default Carousel;
```

## 5. Skeleton component during loading or fetching data

```javascript
import { Skeleton } from "@mui/material";
import React from "react";

// PostSkeleton component to display skeleton placeholders for loading posts
function PostSkeleton({ num }) {
  // Create an array of 'num' elements and map over it to create multiple skeletons
  return Array(num)
    .fill(0)
    .map((item, index) => (
      <div className="post-skeleton flex flex-col justify-between" key={index}>
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
        {/* Skeleton for multiple lines of post info */}
        <div className="post-skeleton__info">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={32} />
          ))}
        </div>
      </div>
    ));
}

export default PostSkeleton;
```

# Functions uses to improve code serviceability and maintenance

## 1. Use ValidateUserAuth and RequireAuth to validate the accessiable route

```javascript
import { useLocalStorage } from "react-use";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const api = process.env.REACT_APP_DATABASE_URL;

// ValidateUserAuth is an async function that takes in a userAuth object
// and returns a user object if the user is authenticated
const ValidateUserAuth = async (userAuth) => {
  if (!userAuth?.userId || !userAuth?.jwt) {
    return;
  }

  try {
    const response = await fetch(`${api}/users/${userAuth.userId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userAuth.jwt}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};

// RequireAuth is a component that takes in a children component
// and returns the children component if the user is authenticated
// else it returns the WelcomePage component
const RequireAuth = () => {
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userIsLogged, setUserIsLogged] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await ValidateUserAuth(userAuth);
      userData ? setUserIsLogged(true) : setUserIsLogged(false);
    }
    fetchUser();
  }, [userAuth]);

  if (userIsLogged === null) {
    return;
  } else if (userIsLogged === false) {
    return <Navigate to="/welcome" />;
  } else {
    return <Outlet />;
  }
};

export { ValidateUserAuth, RequireAuth };
```

## 2. validate input field based on functions and API calls

```javascript
// make an api call to get the suburb options based on the postcode or suburb name entered
const handleSuburbChange = async (suburb) => {
  let response = await fetch(`${api}/suburbs/search?postcode=${suburb}`);
  let jsonData = await response.json();
  return jsonData;
};

// for phone number validation using libphonenumber-js
const validatePhoneNumber = (contactInfoValue) => {
  const phoneNumber = parsePhoneNumberFromString(contactInfoValue, "AU");
  if (phoneNumber && phoneNumber.isValid()) {
    return true;
  } else {
    return "Phone number is invalid";
  }
};
```

## 3. Using the compare function every time user create an post

```javascript
// create notification when post is created and compare with other posts in database to see if there is a match
// if there is a match, create a notification for the user who created the other post
const handleComaprePost = async (post) => {
  const response = await fetch(`${api}/posts`, {
    method: "GET"
  });
  const jsonData = await response.json();
  // compare the new post with other posts in database
  const comparePost = jsonData.data.find(
    (item) =>
      item.color === post.color &&
      // only compare the status if the status is different from the new post
      item.status !== post.status &&
      item.species === post.species &&
      item.breed === post.breed
  );
  if (comparePost) {
    const comparePostUserId = comparePost.userId;
    const newNotification = {
      userId: comparePostUserId,
      message: `A new post has been created that matches your ${comparePost.status} pet(${comparePost.title}), please click and check this post or contact number ${post.contactInfo} for more information.`,
      postId: comparePost._id
    };
    const response = await fetch(`${api}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNotification)
    });
    const jsonData = await response.json();
  }
};
```

# Employ and utilise proper source control methodology

In this project, we prioritize a balanced learning experience for all team members, encompassing both frontend and backend development. To achieve this, we assign tasks based on components rather than segregating tasks solely by frontend or backend responsibilities. This approach ensures that each team member gains exposure to different aspects of the project, fostering a holistic understanding of the system.

However, while this approach enhances individual learning opportunities, it also introduces challenges in terms of collaboration and potential conflicts during the pull request process. Given that multiple team members may work on related components simultaneously, it becomes essential to manage and resolve conflicts effectively to maintain code quality and project coherence.

To mitigate these challenges, we have implemented a robust source control methodology using Github as our primary version control platform. By adhering to strict branch management practices and regular code reviews, we promote seamless collaboration and facilitate efficient conflict resolution. Additionally, clear communication channels and well-defined coding standards help us maintain consistency across the project and enable smooth integration of changes from both team members.

As you can see those screenshot from Github repository we got 11 branches and 142 commits for the frontend

![Frontend-branch](./docs/frontend-branch.png)
![Frontend-commit](./docs/frontend-commit.png)

and 13 branches and 93 commits for the backend

![Frontend-branch](./docs/backend-branch.png)
![Frontend-commit](./docs/backend-commit.png)

# Backend Testing

The testing for backend is conducted using Postman. You can find a portion of the testing details here, while the complete PDF file with all the testing information is available in the "docs" folder for your reference.

## 1. Development Testing

![Backend testing](./docs/BACKEND_dev_test_Page_01.jpg)
![Backend testing](./docs/BACKEND_dev_test_Page_02.jpg)
![Backend testing](./docs/BACKEND_dev_test_Page_03.jpg)
![Backend testing](./docs/BACKEND_dev_test_Page_04.jpg)
![Backend testing](./docs/BACKEND_dev_test_Page_05.jpg)

\*\* the complete PDF file with all the testing information is available in the "docs" folder for your reference.

## 2. Production Testing

![Backend testing](./docs/BACKEND_prod_test_Page_1.jpg)
![Backend testing](./docs/BACKEND_prod_test_Page_2.jpg)
![Backend testing](./docs/BACKEND_prod_test_Page_3.jpg)
![Backend testing](./docs/BACKEND_prod_test_Page_4.jpg)
![Backend testing](./docs/BACKEND_prod_test_Page_5.jpg)

\*\* the complete PDF file with all the testing information is available in the "docs" folder for your reference.

# Frontend Manual Testing

The testing for frontend is using excel sheet to list and check each component and their functionality. You can find a portion of the testing details here, while the complete PDF file or Excel sheet with all the testing information is available in the "docs" folder for your reference.

## 1. Development Testing

![React testing](./docs/React_dev_testing_Page_1.jpg)
![React testing](./docs/React_dev_testing_Page_2.jpg)
![React testing](./docs/React_dev_testing_Page_3.jpg)
![React testing](./docs/React_dev_testing_Page_4.jpg)
![React testing](./docs/React_dev_testing_Page_5.jpg)
![React testing](./docs/React_dev_testing_Page_6.jpg)

## 2. Production Testing

![React testing](./docs/React_prod_testing_Page_1.jpg)
![React testing](./docs/React_prod_testing_Page_2.jpg)
![React testing](./docs/React_prod_testing_Page_3.jpg)
![React testing](./docs/React_prod_testing_Page_4.jpg)
![React testing](./docs/React_prod_testing_Page_5.jpg)
![React testing](./docs/React_prod_testing_Page_6.jpg)

# Employ and utilise project management methodology

This project follows agile methodologies to ensure efficient and collaborative development. With a team of only two members, we believe in distributing tasks evenly to foster a well-rounded experience for each team member. By rotating responsibilities between frontend and backend tasks, we aim to empower all team members with a fair amount of experience in both areas.

Embracing agile principles, we emphasize frequent communication (Zoom meeting), iterative development, and rapid feedback loops (Review others work on Github and give feedback). This allows us to adapt to changing requirements, prioritize features effectively, and deliver incremental improvements continuously. By working in short sprints, we can maintain a steady pace while delivering valuable increments of the project.

The agile approach enables us to remain flexible and respond promptly to challenges, fostering a productive and dynamic work environment. Regular formal or informal meetings help us to synchronize efforts, identify areas for improvement, and celebrate achievements.

Through the integration of agile methodologies, we strive to maximize the project's success, create a collaborative team atmosphere, and ensure that all team members gain valuable experience across both frontend and backend development domains. This not only enhances the project's overall quality but also contributes to the professional growth and satisfaction of each team member.

# Employ and utilise task delegation methodology
