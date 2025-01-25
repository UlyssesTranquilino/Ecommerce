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
import Rating from "@mui/material/Rating";

//COMPONENTS
import ProductCard from "../components/ProductCard";

//SPELL CHECKER
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Divider from "@mui/material/Divider";
import classNames from "classnames";

const Search = () => {
  const navigate = useNavigate();
  const { searchItem } = useParams();
  const [searchProduct, setSearchProduct] = useState<string>(searchItem || "");
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [filterActive, setFilterActive] = useState<boolean>(false);

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
  }, [fetchProducts, searchItem]); // Add `searchItem` to dependencies

  const [productsToShow, setProductsToShow] = useState<Product[]>(products);

  useEffect(() => {
    if (searchItem) {
      setSearchProduct(searchItem); // Update the searchProduct state with the URL param
      setProductsToShow(
        products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchItem.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
            product.category.toLowerCase().includes(searchItem.toLowerCase())
        )
      );
    }
  }, [searchItem, products]);

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

  //Drawer Mobile
  const [open, setOpen] = useState(false);
  const toggleFilter = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterMinPrice, setFilterMinPrice] = useState<number | null>(null);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number | null>(null);

  const filterProducts = () => {
    if (filterMinPrice && filterMaxPrice) {
      if (filterMinPrice > filterMaxPrice) {
        setErrorMessage("Max price must be greater than the min price.");
        return;
      }
    }

    // Determine if the filter is active
    setFilterActive(!!(filterRating || filterMinPrice || filterMaxPrice));
    setOpen(false); // Close the filter drawer

    console.log("FILTER RATING: ", filterRating);

    // Always start filtering from the original products list
    let filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
        product.category.toLowerCase().includes(searchItem.toLowerCase())
    );

    // Apply rating filter
    if (filterRating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= filterRating
      );
    }

    // Apply price range filters
    if (filterMinPrice && filterMaxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          filterMinPrice <= product.price && product.price <= filterMaxPrice
      );
    } else if (filterMinPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => filterMinPrice <= product.price
      );
    } else if (filterMaxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= filterMaxPrice
      );
    }

    setProductsToShow(filteredProducts); // Update the filtered products to display
  };

  const handleResetFilter = () => {
    setFilterRating(null);
    setFilterMinPrice(null);
    setFilterMaxPrice(null);

    setProductsToShow(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
          product.category.toLowerCase().includes(searchItem.toLowerCase())
      )
    );
  };

  const [errorMessage, setErrorMessage] = useState("");

  const DrawerList = (
    <Box sx={{ width: 275 }} role="presentation">
      <div className="p-3">
        <h1 className="font-semibold mb-3 mt-4">Search Filter</h1>
        <h1 className="text-md mt-2">Rating</h1>
        <div className="mt-1 mb-5 flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              className={classNames(
                "flex items-center gap-2 hover:bg-gray-100 p-2 cursor-pointer",
                {
                  "bg-[#E9ECEF]": filterRating === rating,
                }
              )}
              onClick={() => setFilterRating(rating)}
            >
              <Rating name="read-only" value={rating} readOnly />
              {rating !== 5 && <p className="text-sm">& Up</p>}
            </div>
          ))}
        </div>

        <Divider />
        <div className="mt-4 ">
          <h1 className="text-md">Price Range</h1>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="number"
              placeholder="$MIN"
              value={filterMinPrice ?? ""}
              className="w-1/2 p-1 mt-2 border-[1px] border-gray-400 text-sm text-center"
              style={{ outline: "none" }}
              onChange={(e) => setFilterMinPrice(Number(e.target.value))}
            />
            <div className="w-20 h-[1px] bg-gray-400" />
            <input
              type="number"
              placeholder="$MIN"
              value={filterMaxPrice ?? ""}
              className="w-1/2 p-1 mt-2 border-[1px] border-gray-400 text-sm text-center"
              style={{ outline: "none" }}
              onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-1 mt-2">
            {[
              [0, 200],
              [200, 400],
              [400, 600],
            ].map((price) => (
              <div
                key={price[0]}
                className={classNames(
                  "flex items-center bg-[#E9ECEF] hover:bg-gray-100 cursor-pointer rounded-sm",
                  {
                    "bg-white":
                      filterMinPrice === price[0] &&
                      filterMaxPrice === price[1],
                    "border-[#DB4444]":
                      filterMinPrice === price[0] &&
                      filterMaxPrice === price[1],
                    "border-[1px]":
                      filterMinPrice === price[0] &&
                      filterMaxPrice === price[1],
                  }
                )}
              >
                <button
                  className="text-xs py-2 px-5 rouned-md"
                  onClick={() => {
                    setFilterMinPrice(price[0]);
                    setFilterMaxPrice(price[1]);
                  }}
                >
                  {price[0]}-{price[1]}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            <button
              className="rounded-sm w-full border-[1px] border-[#DB4444] h-8 text-sm text-[#DB4444]"
              onClick={handleResetFilter}
            >
              RESET
            </button>

            <button
              className="rounded-sm text-white bg-[#DB4444] w-full h-8 text-sm"
              onClick={filterProducts}
            >
              APPLY
            </button>
          </div>

          {errorMessage && (
            <p className="text-sm text-[#DB4444] mt-3">{errorMessage}</p>
          )}
        </div>
      </div>
    </Box>
  );

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

        <div
          onClick={toggleFilter(true)}
          className={filterActive ? "text-redAccent" : ""}
        >
          <FilterAltOutlinedIcon />
          <p className="text-xs">Filter</p>
        </div>
      </div>

      <Drawer open={open} onClose={toggleFilter(false)} anchor="right">
        {DrawerList}
      </Drawer>

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
