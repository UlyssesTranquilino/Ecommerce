import { useEffect, useState } from "react";
import "../CSS/Categories.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//INTERFACES
import { Product } from "../Intefaces/Product";

//COMPONENTS
import ProductCard from "./ProductCard";

//LINK
import { Link } from "react-router-dom";

//MUI
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//MUI ICONS

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
//Zustand
import { useProductStore } from "../../store/product";

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = () => {
  const handleCategoryClick = (categoryName: string) => {
    setCategories((prevCategories) => {
      return prevCategories.map((cat) => {
        if (categoryName === cat.name) {
          setCurrCategory(cat.name.toLowerCase());
          return {
            ...cat,
            active: true,
          };
        }
        return { ...cat, active: false };
      });
    });
  };

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

  //Gaming  Appliences

  const [categories, setCategories] = useState([
    {
      name: "Mobile",
      icon: (
        <PhoneIphoneIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: true,
    },
    {
      name: "Laptop",
      icon: (
        <LaptopIcon sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }} />
      ),
      active: false,
    },
    {
      name: "Audio",
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
    {
      name: "TV",
      icon: <TvIcon sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }} />,
      active: false,
    },
    {
      name: "Appliances",
      icon: (
        <KitchenOutlinedIcon
          sx={{ fontSize: { xs: 30, sm: 32, md: 35, lg: 37 } }}
        />
      ),
      active: false,
    },
  ]);

  const [currCategory, setCurrCategory] = useState<string>("mobile");

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

  const { fetchProducts, products }: any = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [productsToShow, setProductsToShow] = useState<Product[]>(products);
  useEffect(() => {
    setProductsToShow(products);
  }, [products]);

  const [sortBy, setSortBy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);

    const sortedProducts = [...productsToShow]; // Create a copy of the array

    switch (selectedValue) {
      case "Price: Low to High":
        sortedProducts.sort((a, b) => {
          const priceA =
            a.price - (a.discount ? a.price * (a.discount / 100) : 0);
          const priceB =
            b.price - (b.discount ? b.price * (b.discount / 100) : 0);
          return priceA - priceB; // Ascending order
        });
        break;
      case "Price: High to Low":
        sortedProducts.sort((a, b) => {
          const priceA =
            a.price - (a.discount ? a.price * (a.discount / 100) : 0);
          const priceB =
            b.price - (b.discount ? b.price * (b.discount / 100) : 0);
          return priceB - priceA; // Descending order
        });
        break;
      case "Ratings: Low to High":
        sortedProducts.sort((a, b) => a.rating - b.rating); // Ascending order
        break;
      case "Ratings: High to Low":
        sortedProducts.sort((a, b) => b.rating - a.rating); // Descending order
        break;
      default:
        sortedProducts.sort(() => Math.random() - 0.5); // Random sorting
        break;
    }

    setProductsToShow(sortedProducts);
  };

  // {productsToShow.length == 0 ? (
  return (
    <div>
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          Categories
        </h1>
      </div>

      <div className="mt-5 mb-10">
        <h1 className="font-bold text-2xl text-textPrimary">
          Browse By Category
        </h1>
      </div>

      <div className="slider-container mt-14 ">
        <Slider {...settings} className="custom-slider">
          {categories.map((item) => {
            return (
              <div key={item.name} className="mr-3 lg:mr-5 flex cursor-pointer">
                <div
                  className={`border-[#7e7e7e] border-[1px] rounded w-24 sm:w-32 md:w-36 lg:w-[160px] lg:h-[130px] h-[100px] md:h-[120px] flex flex-col items-center justify-center 
                ${
                  item.active
                    ? "bg-[#DB4444] border-0 text-white"
                    : "hover:bg-gray-200 hover:text-black "
                } text-textPrimary `}
                  onClick={() => {
                    handleCategoryClick(item.name);
                  }}
                >
                  {item.icon}

                  <h1 className="text-sm md:text-base mt-4 ">{item.name}</h1>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {productsToShow.length == 0 ? (
        <div className="mt-10 flex-col justify-center align-items-center max-w-[1200px] m-auto ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
            {/* Render skeletons when loading */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`skeleton-${index + length}`}
                className="flex flex-col mt-24"
              >
                <Skeleton className="rounded-t-lg p-auto h-[250px] sm:h-[300px] md:h[150px] " />
                <Skeleton height={20} className="mt-2" />
                <Skeleton height={20} width="34%" className="mt-2" />
              </div>
            ))}
          </div>{" "}
        </div>
      ) : (
        <div className="flex justify-end items-center mt-14">
          <h1 className="mr-3">Sort by:</h1>
          <FormControl sx={{ m: 0, minWidth: 200 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortBy}
              onChange={handleChange}
              displayEmpty
              sx={{
                backgroundColor: "#DB4444", // Set background color
                color: "#FFFFFF", // Set text color for contrast
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the border
                },
                "& .MuiSelect-icon": {
                  color: "#FFFFFF", // Optional: Change the dropdown arrow color
                },
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Price: Low to High"}>
                Price: Low to High
              </MenuItem>
              <MenuItem value={"Price: High to Low"}>
                Price: High to Low
              </MenuItem>
              <MenuItem value={"Ratings: Low to High"}>
                Ratings: Low to High
              </MenuItem>
              <MenuItem value={"Ratings: High to Low"}>
                Ratings: High to Low
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
        {productsToShow
          .filter((product: Product) => product.category === currCategory)
          .slice(0, 8)
          .map((product: Product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard
                _id={product._id}
                image={product.image}
                title={product.title}
                discount={product.discount}
                price={product.price}
                rating={product.rating}
                ratingCount={product.ratingCount}
              />
            </Link>
          ))}
      </div>

      {productsToShow.length > 0 && (
        <div className="flex justify-center mt-14">
          <Link to={`/category/${currCategory}`}>
            <button className="bg-redAccent text-white px-6 py-2 rounded-sm">
              View All Products
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Categories;
