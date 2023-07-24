import { useEffect, useState } from "react";
import Post from "../../components/Post";
import FilterSelect from "../../components/FilterSelect";
import { useFilterData, useFilterDispatch } from "../../contexts/FilterContext";
import { useUserPost, useUserPostDispatch } from "../../contexts/UserPostContext";
import { useLocalStorage } from "react-use";
import PostSkeleton from "../../components/PostSkeleton";

const api = process.env.REACT_APP_DATABASE_URL;

export default function PetPostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selection_2, setSelection_2] = useState([]);
  const [breed, setBreed] = useState("");
  const filterData = useFilterData();
  const filerDispath = useFilterDispatch();
  const [colorOptions, setColorOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSuburb, setSelectedSuburb] = useState("");
  const [suburbOptions, setSuburbOptions] = useState([]);
  const [userAuth, setUserAuth] = useLocalStorage("pawsReuniteUserAuth");
  const [isloading, setIsLoading] = useState(true);

  const userPostDispatch = useUserPostDispatch();
  const userPostData = useUserPost();

  const handleSpeciesChange = async (event) => {
    const speciesValue = event.target.value;
    setSelectedSpecies(speciesValue);
    if (speciesValue === "") {
      filerDispath({ type: "reset" });
    } else {
      filerDispath({ type: "update", newFilter: { species: speciesValue } });
    }

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
      filerDispath({ type: "update", newFilter: { breed: "" } });
    }
  };

  const handleBreedChange = (event) => {
    const breedValue = event.target.value;
    setBreed(breedValue);
    filerDispath({ type: "update", newFilter: { breed: breedValue } });
  };

  const handleColorChange = (event) => {
    const colorValue = event.target.value;
    setSelectedColor(colorValue);
    filerDispath({ type: "update", newFilter: { color: colorValue } });
  };

  const handleSuburbChange = (event) => {
    const suburbValue = event.target.value;
    setSelectedSuburb(suburbValue);
    filerDispath({ type: "update", newFilter: { suburb: suburbValue } });
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      const response = await fetch(`${api}/posts/filter?status=species`);
      const result = await response.json();
      setSpeciesOptions(result.data);
    };
    const fetchColors = async () => {
      const response = await fetch(`${api}/posts/filter?status=color`);
      const result = await response.json();
      setColorOptions(result.data);
    };
    const fetchSuburbs = async () => {
      const response = await fetch(`${api}/posts/filter?status=suburb`);
      const result = await response.json();
      setSuburbOptions(result.data);
    };

    fetchSpecies();
    fetchColors();
    fetchSuburbs();
  }, []);

  // Get the breeds for the selected species
  const breedsForSelectedSpecies =
    selection_2.find((item) => item.species === selectedSpecies)?.breeds || [];

  useEffect(() => {
    const fetchPosts = async () => {
      let apiUrl = `${api}/posts?status=found`;
      filterData.forEach((filter) => {
        if (filter.species) {
          apiUrl += `&species=${filter.species}`;
        }
        if (filter.breed) {
          apiUrl += `&breed=${filter.breed}`;
        }
        if (filter.color) {
          apiUrl += `&color=${filter.color}`;
        }
        if (filter.suburb) {
          apiUrl += `&suburb=${filter.suburb}`;
        }
      });

      const response = await fetch(apiUrl);
      const result = await response.json();
      setPosts(result.data);
      setIsLoading(false);
    };

    fetchPosts();
  }, [selectedSpecies, breed, selectedColor, selectedSuburb, filterData]);

  function hasNonEmptyStringValue(obj) {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === "string" && value.trim() !== "") {
          return true;
        } else if (typeof value === "object") {
          if (hasNonEmptyStringValue(value)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  return (
    <div className="homepage-container mb-12">
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
        <FilterSelect
          label="color"
          value={selectedColor}
          options={colorOptions}
          onChange={handleColorChange}
          title="color" // Add the title prop for the first filter
        />
        <FilterSelect
          label="suburb"
          value={selectedSuburb}
          options={suburbOptions}
          onChange={handleSuburbChange}
          title="suburb" // Add the title prop for the first filter
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 && posts.map((post) => <Post key={post._id} postData={post} />)}
      </div>
      {isloading && (
        <div className="Skeleton-container grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <PostSkeleton num={8} />
        </div>
      )}
      {/* check filterData has empty string value for prevent first rendering with no posts found display when fetching */}
      {posts.length === 0 && hasNonEmptyStringValue(filterData) && <p>No posts found</p>}
      {userPostData && console.log(userPostData)}
    </div>
  );
}
