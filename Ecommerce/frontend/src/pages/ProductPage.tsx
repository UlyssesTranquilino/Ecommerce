import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
//RATING MUI ICONS
import Rating from "@mui/material/Rating";
//ICONS
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
//RELATED ITEMS
import RelatedItems from "../components/RelatedItems";

import { useProductStore, useUserStore } from "../../store/product";

//TOASTER
import toast, { Toaster } from "react-hot-toast";

const ProductPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  interface Product {
    _id: string;
    title: string;
    brand: string;
    category: string;
    color: string;
    discount: number;
    image: string;
    model: string;
    price: number;
    rating: number;
    ratingCount: number;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
    carts: Product[];
    wishlists: Product[];
  }

  const { currentUser, addUserWishlist } = useUserStore();
  console.log("CURRENT USER PRODUCT PAGE: ", currentUser);

  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileTabs, setMobileTabs] = useState([
    { title: "Description", active: true, content: "" },
    { title: "Specification", active: false, content: "" },
    {
      title: "Reviews",
      active: false,
      content: "There are no reviews for this product yet.",
    },
  ]);
  const [activeTab, setActiveTab] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [isAddedWishlist, setIsAddedWishlist] = useState(false);

  //Fetching Single Product
  const fetchSingleProduct = async (id: string) => {
    const res = await fetch(`http://localhost:5000/${id}`);
    const { data, success } = await res.json();

    setIsSuccess(success);
    setProduct(data);
    console.log(currentUser.wishlists, "  ", data._id);
    if (currentUser?.wishlists.includes(data._id)) setIsAddedWishlist(true);

    setMobileTabs([
      { title: "Description", active: true, content: data.description },
      // { title: "Specification", active: false, content: "" },
      {
        title: "Reviews",
        active: false,
        content: "There are no reviews for this product yet.",
      },
    ]);
    setActiveTab(data.description);
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleWishlist = async (product: Product) => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      const { success, message } = await addUserWishlist(product);
      if (success) {
        console.log("SUCCESS ADDING WISHLIST");
      } else {
        console.log("ERROR ADDING WISHLIST: ");
        console.error(message); // Handle error case
      }
    }
  };

  const toggleAddToCart = () => {
    if (!currentUser) {
      navigate("/signin");
    }
  };
  //TOASTER
  const notifyWishlist = (message: string) => toast(message);

  return (
    <div className="p-5 max-w-[1200px] mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
        }}
      />
      <div className="flex justify-between items-center mb-4">
        <div
          onClick={handleBackClick}
          className="bg-gray-300 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
        >
          <ArrowBackIcon fontSize="small" />
        </div>
        <div
          className="bg-[#F5F5F5] flex w-4 h-4 p-4 items-center justify-center rounded-full cursor-pointer md:hidden"
          onClick={() => {
            product && toggleWishlist(product);
            setIsAddedWishlist(!isAddedWishlist);
            if (!isAddedWishlist) {
              notifyWishlist("❤️ Added to Wishlist!");
            } else {
              notifyWishlist("Removed to Wishlist!");
              if (product?._id) {
                deleteWishlist(product._id);
              }
            }
          }}
        >
          {!isAddedWishlist ? (
            <FavoriteBorderIcon fontSize="small" />
          ) : (
            <FavoriteIcon fontSize="small" style={{ color: "#DB4444" }} />
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-8">
        <div className="flex items-start justify-center relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-[100%] max-w-[500px]"
          />
        </div>
        <div className="mt-5 ">
          <div>
            <h1 className="font-bold text-[21px]">{product?.title}</h1>
            <div className="mt-1 flex items-center">
              <Rating
                name="half-rating-read"
                value={product?.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <p className="opacity-50 text-sm ml-2">
                ({product?.ratingCount} Reviews)
              </p>
            </div>
            <div className="mt-0">
              <h1 className="text-[24px]">
                $
                {product?.price != null && product?.discount != null
                  ? (
                      product.price -
                      product.price * (product.discount / 100)
                    ).toFixed(2)
                  : "Price not available"}
              </h1>
            </div>

            <div>
              <h1 className="text-redAccent text-sm mt-1 font-semibold">
                FREE Delivery
              </h1>
              <p className="text-sm">When You Spend a minimum of $20</p>
            </div>

            <div className="mt-2">
              <h1>
                <span className="font-semibold">Brand: </span>
                {product?.brand && capitalizeFirstLetter(product.brand)}
              </h1>
              <h1>
                <span className="font-semibold">Model: </span>
                {product?.model}
              </h1>
            </div>

            <div className="mt-0 grid ">
              {product?.color && (
                <div className="mb-5">
                  <h1 className="font-semibold">Color</h1>
                  <div className="mt-2 w-7 h-7 border-black border-[2px] rounded-full items-center flex justify-center">
                    <div
                      className="w-5 h-5 rounded-full border-white border-2 ["
                      style={{ backgroundColor: product.color }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="bottom-3 right-0 w-80 grid-cols-8 gap-4 hidden md:grid ">
              <div className="border-[1px] bg-white border-gray-600  w-full h-11 rounded-md col-span-3 grid grid-cols-4">
                <button
                  className="border-gray-600 border-r-[1px] col-span-1"
                  onClick={() => {
                    setQuantity((prev) => {
                      return prev - 1 <= 1 ? 1 : prev - 1;
                    });
                  }}
                >
                  <RemoveIcon />
                </button>
                <div className="flex items-center justify-center col-span-2 ">
                  <h1>{quantity}</h1>
                </div>
                <button
                  className="bg-redAccent col-span-1"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <AddIcon className="text-white" />
                </button>
              </div>
              <button
                className="bg-redAccent text-white w-full h-11 shadow-lg rounded-md col-span-4 "
                onClick={toggleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="col-span-1 border-[1px] border-gray-600 h-11 w-11 rounded-md"
                onClick={() => {
                  product && toggleWishlist(product);
                  setIsAddedWishlist(!isAddedWishlist);
                  if (!isAddedWishlist) {
                    if (product) {
                      toggleWishlist(product);
                    }
                    notifyWishlist("❤️ Added to Wishlist!");
                  } else {
                    notifyWishlist("Removed to Wishlist!");
                    if (product?._id) {
                      deleteWishlist(product._id);
                    }
                  }
                }}
              >
                {!isAddedWishlist ? (
                  <FavoriteBorderIcon fontSize="small" />
                ) : (
                  <FavoriteIcon fontSize="small" style={{ color: "#DB4444" }} />
                )}
              </button>
            </div>
            <div>
              <div className="mt-0 md:hidden">
                {mobileTabs.map((tab, index) => (
                  <button
                    className={`${
                      tab.active
                        ? "bg-redAccent border-redAccent border-2   text-white"
                        : "border-[#595959] border-2 text-[#595959] "
                    } rounded-full px-2 py-1.5 mr-1`}
                    key={tab.title}
                    onClick={() => {
                      setMobileTabs((prev) =>
                        prev.map((item) => {
                          if (item.title === tab.title) {
                            setActiveTab(item.content);
                            return { ...item, active: true };
                          } else {
                            return { ...item, active: false };
                          }
                        })
                      );
                    }}
                  >
                    <p className="text-sm">{tab.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-20">
        <p className="text-[15px]">{activeTab}</p>
      </div>

      {isSuccess && (
        <RelatedItems category={product?.category} id={product?._id} />
      )}
      <div className="fixed bottom-3 right-0 w-[100%] px-5 grid grid-cols-7 gap-4 md:hidden">
        <div className="border-[1px] bg-white border-gray-600  w-full h-10 shadow-lg rounded-md col-span-3 grid grid-cols-4">
          <button
            className="border-gray-600 border-r-[1px] col-span-1"
            onClick={() => {
              setQuantity((prev) => {
                return prev - 1 <= 1 ? 1 : prev - 1;
              });
            }}
          >
            <RemoveIcon />
          </button>
          <div className="flex items-center justify-center col-span-2 ">
            <h1>{quantity}</h1>
          </div>
          <button
            className="bg-redAccent col-span-1"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <AddIcon className="text-white" />
          </button>
        </div>
        <button className="bg-redAccent text-white w-full h-10 shadow-lg rounded-md col-span-4 ">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
