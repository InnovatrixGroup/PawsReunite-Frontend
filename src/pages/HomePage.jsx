import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Post from "../components/Post";

const api = process.env.REACT_APP_DATABASE_URL;

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${api}/posts`);
      const result = await response.json();
      setPosts(result.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="homepage-container mb-12">
      {/* <HeroSection /> */}

      {posts.length > 0 && posts.map((post) => <Post key={post._id} postId={post._id} />)}
    </div>
  );
}
