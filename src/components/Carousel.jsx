import React, { useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Navigate } from "react-router-dom";

// Carousel component that displays a set of images in a carousel format
function Carousel(props) {
  // Destructuring props to access images, handleRedirectClick, and postId
  const images = props.images;

  const handleRedirectClick = props.handleRedirectClick;

  // State to keep track of the current image index being displayed
  const [curr, setCurr] = useState(0);

  // Function to move to the previous slide/image in the carousel
  const prevSlide = () => {
    setCurr(curr === 0 ? images.length - 1 : curr - 1);
  };

  // Function to move to the next slide/image in the carousel
  const nextSlide = () => {
    setCurr(curr === images.length - 1 ? 0 : curr + 1);
  };

  return (
    <div className="carousel-container relative w-full aspect-square  overflow-hidden sm:max-h-[384px] md:max-h-[448px] lg:max-h-[448px]">
      {/* Carousel images container with a horizontal translation to show current image */}
      <div
        className="carousel__images flex aspect-square	 transition-transform ease-out duration-500 sm:max-w-sm md:max-w-md  lg:max-w-md justify-start"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            className="w-full aspect-square	object-cover"
            key={index}
            src={image}
            alt="pet pictures"
          />
        ))}
      </div>

      {/* Buttons for navigating between images and triggering redirect on click */}
      {/* inset-0 defined by the distance of 0 pixels to the parent DIV element, on all four sides */}
      <div
        onClick={(e) => e.currentTarget === e.target && handleRedirectClick()}
        className="carousel__buttons inset-0 absolute flex items-center justify-between px-3 cursor-pointer"
      >
        <button
          onClick={prevSlide}
          className="carousel__button p-2 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white/80"
        >
          <KeyboardArrowLeftOutlinedIcon />
        </button>
        <button
          onClick={nextSlide}
          className="carousel__button p-2 rounded-full shadow bg-white/50 text-gray-800 hover:bg-white/80"
        >
          <KeyboardArrowRightOutlinedIcon />
        </button>
      </div>

      {/* Dots for indicating the current image in the carousel */}
      <div className="carousel__dots absolute bottom-4 right-0 left-0 flex justify-center items-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 bg-gray-400 rounded-full ${
              curr === index ? "bg-gray-800 p-1" : ""
            } `}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
