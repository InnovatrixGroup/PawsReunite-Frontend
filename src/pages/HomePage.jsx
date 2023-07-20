import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Post from "../components/Post";
import Filter from "../components/Filter";

const api = process.env.REACT_APP_DATABASE_URL;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const filterOptions = ["species", "breed", "color", "suburb"];
  const [seletedFilters, setSelectedFilters] = useState("");

  const handleFilterChange = (value) => {
    setSelectedFilters(value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let apiUrl = `${api}/posts`;
      if (seletedFilters) {
        apiUrl += `?species=${seletedFilters}`;
      }
      const response = await fetch(apiUrl);
      const result = await response.json();
      setPosts(result.data);
    };
    fetchPosts();
  }, [seletedFilters]);

  return (
    <div className="homepage-container mb-12">
      <HeroSection />
      <div className="filter-container grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-4">
        {filterOptions.map((filterOption) => (
          <Filter
            key={filterOption}
            filterType={filterOption}
            onFilterChange={handleFilterChange}
          />
        ))}
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && posts.map((post) => <Post key={post._id} postId={post._id} />)}
      </div>
    </div>
  );
}
