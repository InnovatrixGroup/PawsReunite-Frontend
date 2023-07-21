import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Post from "../components/Post";
import FilterSelect from "../components/FilterSelect";

const api = process.env.REACT_APP_DATABASE_URL;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selection_2, setSelection_2] = useState([]);
  const [breed, setBreed] = useState("");

  const handleSpeciesChange = async (event) => {
    const speciesValue = event.target.value;
    setSelectedSpecies(speciesValue);

    // Fetch the breed data for the selected species
    const response = await fetch(`${api}/posts/distinct-breeds?species=${speciesValue}`);
    const result = await response.json();
    setSelection_2(result.data);

    // Check if the current breed is available for the selected species
    const breedsForSelectedSpecies =
      selection_2.find((item) => item.species === speciesValue)?.breeds || [];
    if (!breedsForSelectedSpecies.includes(breed)) {
      // If the current breed is not available for the selected species, reset breed
      setBreed("");
    }
  };

  const handleBreedChange = (event) => {
    const breedValue = event.target.value;
    setBreed(breedValue);
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      const response = await fetch(`${api}/posts/filter?status=species`);
      const result = await response.json();
      setSpeciesOptions(result.data);
    };
    fetchSpecies();
  }, []);

  // Get the breeds for the selected species
  const breedsForSelectedSpecies =
    selection_2.find((item) => item.species === selectedSpecies)?.breeds || [];

  useEffect(() => {
    console.log("selectedSpecies", selectedSpecies);
    console.log("breed", breed);
    const fetchPosts = async () => {
      let apiUrl;
      if (selectedSpecies && breed) {
        apiUrl = `${api}/posts?species=${selectedSpecies}&breed=${breed}`;
      } else if (selectedSpecies) {
        apiUrl = `${api}/posts?species=${selectedSpecies}`;
      } else {
        apiUrl = `${api}/posts`;
      }

      const response = await fetch(apiUrl);
      const result = await response.json();
      setPosts(result.data);
    };
    fetchPosts();
  }, [selectedSpecies, breed]);

  return (
    <div className="homepage-container mb-12">
      <HeroSection />
      <div className="filter-container grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-4">
        <FilterSelect
          label="Species"
          value={selectedSpecies}
          options={speciesOptions}
          onChange={handleSpeciesChange}
          title="Species" // Add the title prop for the first filter
        />
        <FilterSelect
          label="Breed"
          value={breed}
          options={breedsForSelectedSpecies}
          onChange={handleBreedChange}
          title="Breed" // Add the title prop for the second filter
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && posts.map((post) => <Post key={post._id} postId={post._id} />)}
      </div>
    </div>
  );
}
