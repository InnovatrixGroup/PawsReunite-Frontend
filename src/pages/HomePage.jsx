import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Post from "../components/Post";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import bg from "../pics/bg.svg";

const api = process.env.REACT_APP_DATABASE_URL;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

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
      <HeroSection />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && posts.map((post) => <Post key={post._id} postId={post._id} />)}
      </div>
    </div>
  );
}
