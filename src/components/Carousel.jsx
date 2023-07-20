import React, { useState } from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

function Carousel(props) {
  const images = props.images;
  const [curr, setCurr] = useState(0);

  const prevSlide = () => {
    setCurr(curr === 0 ? images.length - 1 : curr - 1);
  };

  const nextSlide = () => {
    setCurr(curr === images.length - 1 ? 0 : curr + 1);
  };

  return (
    <div className="carousel-container relative w-full max-h-96 overflow-hidden">
      <div
        className="carousel__images flex max-h-96 transition-transform ease-out duration-500 md:max-w-md  lg:max-w-md justify-start"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((image) => (
          <img className="w-full object-cover" src={image} alt="pet pictures" />
        ))}
      </div>
      {/* inset-0 defined by the distance of 0 pixels to the parent DIV element, on all four sides */}
      <div className="carousel__buttons inset-0 absolute flex items-center justify-between px-3">
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
      <div className="carousel__dots absolute bottom-4 right-0 left-0 flex justify-center items-center gap-2">
        {images.map((_, index) => (
          <div
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
