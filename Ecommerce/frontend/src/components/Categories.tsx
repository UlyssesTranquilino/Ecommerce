import React from "react";
import "../CSS/Categories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Categories = () => {
  const CustomNextArrow = ({ onClick }: any) => {
    return (
      <div
        className="custom-arrow custom-next bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center "
        onClick={onClick}
      >
        <ArrowForwardIcon />
      </div>
    );
  };

  const CustomPrevArrow = ({ onClick }: any) => {
    return (
      <div
        className="custom-arrow custom-prev bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center mr-4 "
        onClick={onClick}
      >
        <ArrowBackIcon />
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="w-5 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-bold text-lg ml-3">Categories</h1>
      </div>

      <div className="slider-container mt-14">
        <Slider {...settings}>
          <div className="w-20 h-20 bg-blue-gray-100">
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>
          <div>
            <h3>9</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
