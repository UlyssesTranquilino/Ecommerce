import { useEffect, useState } from "react";
import "../CSS/Categories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//IMAGES
import NoProductFound from "../assets/Images/No Product Found.png";

//LINK
import { Link, useParams, useNavigate } from "react-router-dom";

//ICONS
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Product } from "../Intefaces/Product";
import { useProductStore } from "../../store/product";

//MUI
import { CircularProgress } from "@mui/material";

//COMPONENTS
import ProductCard from "../components/ProductCard";

const Search = () => {
  const navigate = useNavigate();
  const { searchItem } = useParams();
  const [searchProduct, setSearchProduct] = useState<string>(searchItem || "");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const handleBackClick = () => {
    navigate(-1); // Go back in history
  };

  const {
    fetchProducts,
    products,
  }: { fetchProducts: Function; products: Product[] } = useProductStore(); //Zustand Functions

  //Fetch products
  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setIsFetching(false);
    };
    fetchData();
  }, [fetchProducts]);

  const [productsToShow, setProductsToShow] = useState<Product[]>(products);

  useEffect(() => {
    setProductsToShow(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchProduct.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchProduct.toLowerCase()) ||
          product.category.toLowerCase().includes(searchProduct.toLowerCase())
      )
    );
    console.log("PRODUCTS TO SHOW: ", productsToShow);
  }, [products]);

  //Sort By Price
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
      default:
        sortedProducts.sort(() => Math.random() - 0.5); // Random sorting
        break;
    }

    setProductsToShow(sortedProducts);
  };

  const handleSearch = () => {
    if (searchProduct && searchProduct.trim()) {
      navigate(`/search/${searchProduct}`); // Programmatically navigate
      navigate(0); // Force reload if you're already on the same page
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="mt-10 flex-col justify-center align-items-center max-w-[1200px] w-[90%] m-auto ">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            handleBackClick();
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </div>
        <div
          className="h rounded-l-lg flex justify-between bg-blue-gray-50"
          style={{ width: "90%", margin: "auto" }}
        >
          <input
            type="text"
            id="search"
            value={searchProduct}
            placeholder="What are you looking for?"
            onChange={(e) => setSearchProduct(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
            className="bg-blue-gray-50 h-9 w-4/5 focus:outline-none rounded-l-lg ml-5 mt-[3px]"
          ></input>

          <button
            onClick={handleSearch}
            className="bg-redAccent text-textPrimary w-12 sm:w-16 h-10 rounded-tr-md rounded-br-md "
          >
            <SearchIcon style={{ color: "white" }} />
          </button>
        </div>

        <div className="relative ">
          <FilterAltOutlinedIcon />
          <p className="text-xs">Filter</p>
        </div>
      </div>

      {isFetching ? (
        <div className="flex justify-center mt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      ) : productsToShow?.length >= 1 ? (
        <div>
          <div className="mt-5 text-sm">
            Search Results for:{" "}
            <span className="text-redAccent">"{searchProduct}"</span>
          </div>
          <div className="flex justify-start items-center mt-5">
            <h1 className="mr-3">Sort by:</h1>
            <FormControl sx={{ m: 0, minWidth: 200 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={sortBy}
                onChange={handleChange}
                displayEmpty
                sx={{
                  backgroundColor: "white", // Set background color
                  color: "black", // Set text color for contrast
                  borderColor: "#424242", // Optional: Change the border color
                  borderWidth: 1,
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove the border
                  },
                  "& .MuiSelect-icon": {
                    color: "black", // Optional: Change the dropdown arrow color
                  },
                }}
              >
                <MenuItem value="">
                  <em>Price</em>
                </MenuItem>
                <MenuItem value={"Price: Low to High"}>
                  Price: Low to High
                </MenuItem>
                <MenuItem value={"Price: High to Low"}>
                  Price: High to Low
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
            {productsToShow.map((product: Product) => (
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
        </div>
      ) : (
        <div>
          <div className="mt-5 text-sm">
            Search Results for:{" "}
            <span className="text-redAccent">"{searchProduct}"</span>
          </div>
          <div className="flex flex-col justify-center items-center ">
            <img
              src={NoProductFound}
              alt="No Products Found"
              className="w-64 mt-20"
            />
            <h1 className="p-3 w-56 text-gray-700 font-bold text-center">
              No Products Found
            </h1>
            <p className="text-gray-700 text-sm text-center">
              Try searching for something else
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
