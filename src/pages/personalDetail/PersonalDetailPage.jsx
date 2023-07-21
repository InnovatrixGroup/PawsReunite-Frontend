import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useUserPost } from "../../contexts/UserPostContext";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalDetailPage.css";

const api = process.env.REACT_APP_DATABASE_URL;

export default function PersonalDetailPage() {
  // const [userData, setUserData] = useState(null);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate();
  const userPostData = useUserPost();

  const handleLogout = () => {
    setUserAuth(null);

    // navigate to landing page automatically after logout
    setTimeout(() => {
      navigate("/welcome");
    }, 2000);
  };

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
    fetchUserData();
  }, []);

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
          <button>Edit profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="personal-info-post-container">
        <h1>Your Posts</h1>
        <div className="personal-info-post-gallery">
          {userPostData?.length > 0 &&
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
        <button>Create Post</button>
      </div>
    </div>
  );
}
