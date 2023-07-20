import React, { useState, useEffect } from "react";
import FilterSelect from "./FilterSelect";

const selection_1 = ["Dog", "Cat", "Bird"];

const selection_2 = [
  {
    breeds: ["German Specie", "Peterbald"],
    species: "Dog"
  },
  {
    breeds: ["American Bobtail", "Peterbald", "Minskin"],
    species: "Cat"
  },
  {
    breeds: ["a", "b", "c"],
    species: "Bird"
  }
];

function TestFilter() {
  const [species, setSpecies] = useState(selection_1[0]);
  const [breed, setBreed] = useState(
    selection_2.find((item) => item.species === selection_1[0]).breeds[0]
  );

  const handleSpeciesChange = (event) => {
    const speciesValue = event.target.value;
    setSpecies(speciesValue);
  };

  const handleBreedChange = (event) => {
    const breedValue = event.target.value;
    setBreed(breedValue);
  };

  useEffect(() => {
    // Set initial species and breed options
    // if (!species && !breed) {
    //   setSpecies(selection_1[0]);
    //   setBreed(selection_2.find(item => item.species === selection_1[0]).breeds[0]);
    // }

    // Get the breeds for the selected species
    const breedsForSelectedSpecies =
      selection_2.find((item) => item.species === species)?.breeds || [];

    // Check if the current breed is available for the selected species
    if (!breedsForSelectedSpecies.includes(breed)) {
      // If the current breed is not available for the selected species, reset breed
      setBreed(breedsForSelectedSpecies[0] || "");
    }
  }, [species, breed]);

  // Get the breeds for the selected species
  const breedsForSelectedSpecies =
    selection_2.find((item) => item.species === species)?.breeds || [];

  return (
    <div>
      <FilterSelect
        label="Species"
        value={species}
        options={selection_1}
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
  );
}

export default TestFilter;
