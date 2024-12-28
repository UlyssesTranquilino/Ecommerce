import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import WishlistCard from "../components/WishlistCard";

//INTERFACES
import { Product } from "../Intefaces/Product";

//MUI
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//ZUSTAND
import { useProductStore } from "../../store/product";

const WishlistPage = () => {
  const { wishlists, fetchWishlists } = useProductStore();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [categoryProduct, setCategoryProduct] = useState<Product[]>(wishlists);

  const fetchWishlistProduct = async () => {
    try {
      console.log("FETCHING WISHLISTS");
      const res = await fetch(`http://localhost:5000/api/wishlist`);
      const { data, success } = await res.json();
      setIsSuccess(success);

      console.log("DATA: ", data);

      if (success) {
        setCategoryProduct(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [sortBy, setSortBy] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setSortBy(selectedValue);

    const sortedProducts = [...categoryProduct]; // Create a copy of the array

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

    setCategoryProduct(sortedProducts);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchWishlistProduct();
  }, []); // Ensure the effect runs when the category changes

  return (
    <div className="w-[90%] m-auto mt-4  max-w-[1200px] pb-52">
      <div className="flex items-center mt-10">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-xl ml-3">Wishlist</h1>
      </div>
      {isSuccess && categoryProduct.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
          {categoryProduct.map((product: Product) => (
            <div key={product._id}>
              <WishlistCard
                _id={product._id}
                image={product.image}
                title={product.title}
                discount={product.discount}
                price={product.price}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
