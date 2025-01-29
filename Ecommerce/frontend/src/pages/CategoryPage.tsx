import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

//INTERFACES
import { Product } from "../Intefaces/Product";

//MUI
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryPage = () => {
  const { category } = useParams(); // Use useParams to get the category from the URL
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);

  const fetchCategoryProduct = async () => {
    try {
      const res = await fetch(`https://exclusive-ecommerce-app.onrender.com`);
      const { data, success } = await res.json();
      setIsSuccess(success);

      if (success) {
        setCategoryProduct(
          data.filter(
            (product: { category: string }) => product.category === category
          )
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, [category]); // Ensure the effect runs when the category changes

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

  return (
    <div className="w-[90%] m-auto mt-4  max-w-[1200px] ">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="hover:text-redAccent hover:underline cursor-pointer">
            Home{" "}
          </h1>
        </Link>
        <h1 className="mx-2">/</h1>
        <h1 className="text-redAccent underline cursor-pointer">
          {capitalizeFirstLetter(category ?? "")}
        </h1>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-xl ml-3">
          {capitalizeFirstLetter(category ?? "")}
        </h1>
      </div>

      {isSuccess ? (
        <div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
            {categoryProduct.length > 0 ? (
              categoryProduct.map((product: Product) => (
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
              ))
            ) : (
              <div className="flex justify-center mt-24">
                <CircularProgress sx={{ color: "#DB4444" }} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex-col justify-center align-items-center max-w-[1200px] m-auto ">
          <div className="flex justify-end mt-12 gap-2 items-center">
            <Skeleton className="rounded-t-lg p-auto h-[25px]" width={60} />
            <Skeleton className="rounded-t-lg p-auto h-[45px]" width={190} />
          </div>
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
      )}
    </div>
  );
};

export default CategoryPage;
