import { useEffect } from "react";
import "../CSS/Categories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MonitorIcon from "@mui/icons-material/Monitor";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";

//Zustand
import { useProductStore } from "../../store/product";

const Categories = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("PRO: ", products);

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

  const categories: Object[] = [
    {
      name: "Phones",
      icon: (
        <PhoneIphoneIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
    {
      name: "Computers",
      icon: (
        <MonitorIcon sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }} />
      ),
      active: false,
    },
    {
      name: "Smart Watch",
      icon: (
        <WatchOutlinedIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
    {
      name: "Camera",
      icon: (
        <CameraAltOutlinedIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
    {
      name: "Headphones",
      icon: (
        <HeadphonesOutlinedIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
    {
      name: "Gaming",
      icon: (
        <SportsEsportsOutlinedIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
  ];

  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768, // Screen width at which the settings apply
        settings: {
          slidesToShow: 2, // Show 2 slides at smaller screen widths
        },
      },
      {
        breakpoint: 480, // Screen width at which the settings apply
        settings: {
          slidesToShow: 1, // Show 1 slide at very small widths
        },
      },
    ],
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          Categories
        </h1>
      </div>

      <div className="slider-container mt-14 ">
        <Slider {...settings} className="custom-slider">
          {categories.map((item, index) => {
            return (
              <div key={index} className="mr-3 flex cursor-pointer">
                <div className="border-[rgba(0, 0, 0, 0.3)] border-2 rounded w-24 sm:w-32 md:w-36 h-[100px] md:h-[120px] flex flex-col items-center justify-center hover:bg-[#DB4444] hover:text-white hover:border-0">
                  {item.icon}

                  <h1 className="text-sm md:text-base mt-4">{item.name}</h1>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
{
  /* <div className="border-[rgba(0, 0, 0, 0.3)] border-2 rounded">
<div className="w-[115px] h-[80px] flex items-center justify-center p-14">
  <button className="text-red text-3xl">
    {categories[0].icon}
    <p className="text-sm mt-3">Phones</p>
  </button>
</div>
</div> */
}
