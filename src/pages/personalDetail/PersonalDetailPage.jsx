import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useUserPost } from "../../contexts/UserPostContext";

const api = process.env.REACT_APP_DATABASE_URL;

export default function PersonalDetailPage() {
  // const [userData, setUserData] = useState(null);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [userDetail, setUserDetail] = useState(null);
  const userPostData = useUserPost();

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
        <h1>Personal Info</h1>
        <h3 className="username">{userDetail && userDetail.username}</h3>
        <h3 className="email">{userDetail && userDetail.email}</h3>
        <div className="personal-info-btn-container">
          <button>Edit profile</button>
          <button>Logout</button>
        </div>
      </div>
      <div>
        <h1>Your Posts</h1>
        {userPostData?.length > 0 &&
          userPostData.map((post) => (
            <a href={`./pets/${post._id}`}>
              <img src={post.photos[0]} alt="pet pictures" key={post._id} />
            </a>
          ))}
      </div>
      <button>Create Post</button>
    </div>
  );
}
