import React from "react";
import hero_image from "../pics/hero_image.jpg";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-container bg-orange-900 text-white flex flex-row-reverse">
      <div className="hero-image hidden w-full md:w-1/3 md:block lg:w-1/3 lg:block">
        <img className="w-full h-full object-cover" src={hero_image} alt="hero" />
      </div>
      <div className="hero-info py-16 px-10 md:w-2/3 lg:w-2/3 lg:p-24 ">
        <h1 className="hero-title text-3xl font-bold mb-3 text-left lg:text-5xl lg:mb-8">
          Stay Updated and Help Reunite Beloved Companions
        </h1>
        <h3 className="hero-info font-thin mb-8 text-left lg:text-lg lg:font-extralight lg:mb-16">
          Hey there, pet lover! We know how heart-wrenching it can be when your furry friend goes
          missing. But fret not, because we're here to lend a helping paw! Click on the link below
          to uncover a treasure trove of recent found pet posts.
        </h3>
        <Link to="/pets">
          <button className="border border-white px-16 py-1 rounded-xl font-light lg:flex hover:bg-gray-200 hover:text-black">
            Find More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
