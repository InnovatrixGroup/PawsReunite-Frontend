import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useUserPostDispatch, useUserPost } from "../contexts/UserPostContext";
import { useNavigate } from "react-router-dom";
import "../styles/PersonalDetailPage.css";
import EditProfileDialog from "../components/EditProfileDialog";
import EditPostPopup from "../components/EditPostPopup";

const api = process.env.REACT_APP_DATABASE_URL;

export default function PersonalDetailPage() {
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userDetail, setUserDetail] = useState(null);
  const [isCreate, setIsCreate] = useState(false);
  const navigate = useNavigate();
  const userPostDispatch = useUserPostDispatch();
  const userPostData = useUserPost();

  const handleLogout = () => {
    setUserAuth(null);
    alert("You have logged out.");
    // navigate to landing page automatically after logout
    navigate("/welcome");
  };

  // fetch user data and save to state
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${api}/users/${userAuth.userId}`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth.jwt}`
          }
        });
        const jsonData = await response.json();
        setUserDetail(jsonData);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchUserPosts = async () => {
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
    };

    fetchUserPosts();

    fetchUserData();
  }, [userAuth]);

  // handle edit profile dialog
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const closeEditProfileDialog = () => {
    setEditProfileDialogOpen(false);
  };
  const openEditProfileDialog = () => {
    setEditProfileDialogOpen(true);
  };

  // hide navbar when edit profile dialog is open, but show footer
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    editProfileDialogOpen && navbar.classList.add("hidden");

    const footer = document.querySelector(".footer-container");
    editProfileDialogOpen && footer.classList.add("show-footer");

    return () => {
      navbar.classList.remove("hidden");
      footer.classList.remove("show-footer");
    };
  }, [editProfileDialogOpen]);

  return (
    <div>
      <div className="personal-info-container">
        <div className="personal-info-avatar hidden md:block lg:block"></div>
        <div className="personal-info">
          <h1>Personal Info</h1>
          <h3 className="username">{userDetail && userDetail.username}</h3>
          <h3 className="email">{userDetail && userDetail.email}</h3>
        </div>
        <div className="personal-info-btn-container">
          <button onClick={openEditProfileDialog}>Edit profile</button>
          <EditProfileDialog
            isOpen={editProfileDialogOpen}
            closeDialog={closeEditProfileDialog}
            setUserDetail={setUserDetail}
            userDetail={userDetail}
            userAuth={userAuth}
            setUserAuth={setUserAuth}
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="personal-info-post-container">
        <h1>Your Posts</h1>
        <div className="personal-info-post-gallery">
          {userPostData &&
            userPostData.length > 0 &&
            userPostData.map((post) => (
              <a
                href={`./pets/${post._id}`}
                key={post._id}
                style={{ backgroundImage: `url(${post.photos[0]})` }}
              >
                {" "}
              </a>
            ))}
        </div>
        <button onClick={() => setIsCreate(true)}>Create Post</button>
        {
          <EditPostPopup
            trigger={isCreate}
            close={() => setIsCreate(false)}
            post={{}}
            mode="create"
          />
        }
      </div>
    </div>
  );
}