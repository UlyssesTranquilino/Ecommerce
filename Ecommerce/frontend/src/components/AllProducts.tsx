import { useEffect, useState } from "react";
//Zustand
import { useProductStore } from "../../store/product";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
//RATING MUI ICONS
import Rating from "@mui/material/Rating";

//LINK
import { Link } from "react-router-dom";

const AllProducts = () => {
  interface Product {
    _id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount: number;
    rating: number;
    ratingCount: number;
  }
  const {
    fetchProducts,
    products,
  }: { fetchProducts: Function; products: Product[] } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  useEffect(() => {
    setProductsToShow(products.filter((_product, index) => index < 16));
  }, [products]);

  const [productsToShow, setProductsToShow] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [viewAllClicked, setViewAllClicked] = useState(false);

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

  const handleViewAllClick = () => {
    setViewAllClicked(true);
    setProductsToShow(products); // Show all products when button is clicked
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          All Products
        </h1>
      </div>
      <div className="mt-5 mb-10">
        <h1 className="font-bold text-2xl text-textPrimary">
          Explore All Products
        </h1>
      </div>

      {productsToShow.length > 0 && (
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
        {productsToShow.length > 0 ? (
          productsToShow.map((product: Product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div className="rounded-lg bg-white flex-col relative border-redAccent hover:shadow-md cursor-pointer hover:translate-y-[-4px] transition-transform duration-200 ease-in-out ">
                <div className="rounded-t-lg p-auto h-[300px] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-auto h-auto object-cover"
                  />
                </div>
                <div className="mt-5 p-3 pb-0">
                  <h1 className="font-medium line-clamp-2">{product.title}</h1>
                  <div className="mt-3 flex ">
                    {product.discount ? (
                      <>
                        <p className="font-medium text-redAccent mr-2">
                          $
                          {(
                            product.price -
                            product.price * (product.discount / 100)
                          )
                            .toFixed(2)
                            .toString()}
                        </p>
                        <p className="font-medium text-gray-500 line-through">
                          ${product.price.toString()}
                        </p>
                      </>
                    ) : (
                      <p className="font-medium text-redAccent">
                        ${product.price.toString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-1 ml-2.5 mb-3 flex">
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                  <p className="font-medium text-[#808080] text-sm ml-2">
                    ({product.ratingCount})
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center mt-24 col-span-2 md:col-span-4">
            <CircularProgress sx={{ color: "#DB4444" }} />
          </div>
        )}
      </div>

      {productsToShow.length > 0 && !viewAllClicked && (
        <div className="flex justify-center mt-20">
          <button
            className="bg-redAccent text-white px-6 py-2 rounded-sm"
            onClick={handleViewAllClick}
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
