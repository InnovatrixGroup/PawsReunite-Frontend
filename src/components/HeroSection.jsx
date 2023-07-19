import React from "react";

function HeroSection() {
  return (
    <div className="hero-container p-10 pt-28 bg-orange-900 text-white">
      <h1 className="hero-title text-3xl font-bold mb-3 text-left">
        Stay Updated and Help Reunite Beloved Companions
      </h1>
      <h3 className="hero-info font-thin mb-8 text-left">
        Hey there, pet lover! We know how heart-wrenching it can be when your furry friend goes
        missing. But fret not, because we're here to lend a helping paw! Click on the link below to
        uncover a treasure trove of recent found pet posts.
      </h3>
      <button className="border border-white px-16 py-1 rounded-xl font-light">Find More</button>
    </div>
  );
}

export default HeroSection;
