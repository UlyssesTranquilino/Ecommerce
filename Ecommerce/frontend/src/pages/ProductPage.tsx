import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

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

import { useUserStore } from "../../store/product";

//TOASTER
import toast, { Toaster } from "react-hot-toast";

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
    stock: number;
    ratingCount: number;
  }

  const { currentUser, addUserWishlist, deleteUserWishlist, addUserCart }: any =
    useUserStore();

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
      let success: boolean, message: string;
      if (!isAddedWishlist) {
        ({ success, message } = await addUserWishlist(product));
      } else {
        ({ success, message } = await deleteUserWishlist(product, currentUser));
      }
      if (success) {
        console.log("SUCCESS ADDING WISHLIST");
      } else {
        console.log("ERROR ADDING WISHLIST: ");
        console.error(message); // Handle error case
      }
    }
  };

  const [cartToggled, setCartToggled] = useState(false);
  console.log(cartToggled);

  const toggleAddToCart = async (device: string) => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      setCartToggled(true);

      let productPrice: any;
      if (product?.discount != null)
        productPrice = (
          product?.price -
          product?.price * (product?.discount / 100)
        ).toFixed(2);
      else productPrice = product?.price;

      const { success } = await addUserCart({
        _id: product?._id,
        price: productPrice,
        quantity: quantity,
        model: product?.model,
        color: product?.color,
      });

      if (success) {
        if (device == "mobile") onClickCartAnimation();
        toast("✅ Product added to cart!");
      } else {
        toast("Failed added to cart!");
      }
    }
  };
  //TOASTER
  const notifyWishlist = (message: string) => toast(message);

  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  const onClickCartAnimation = contextSafe(() => {
    setCartToggled(true);
    const viewportWidth = window.innerWidth;

    gsap.from(".imgCart", {
      opacity: 0.4,
      display: "block",
    });
    gsap.to(".imgCart", {
      x: viewportWidth - viewportWidth * 0.6,
      y: "-120%",
      scale: 0,
      opacity: 0,
      duration: 1.5,
      onComplete: () => {
        // Reset the position after the animation is complete
        gsap.set(".imgCart", {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 0,
        });
      },
    });
  });

  const handleTabClick = (title: string) => {
    setMobileTabs((prev) =>
      prev.map((item) => {
        return item.title === title
          ? { ...item, active: true }
          : { ...item, active: false };
      })
    );
  };

  return (
    <div>
      {isSuccess ? (
        <div className="p-5 max-w-[1200px] mx-auto relative">
          <div
            className="absolute flex-1 z-10 w-[90%] h-52 flex items-center justify-center md:block none"
            ref={container}
          >
            <img
              src={product?.image}
              alt={product?.title}
              className="imgCart w-[100%] max-w-[200px] mt-36 sm:mt-52 md:mt-80 md:mr-44 opacity-0"
            />
          </div>
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
              className="relative z-20 bg-gray-300 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => {
                handleBackClick();
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </div>
            <div
              className="relative z-20 bg-[#F5F5F5] flex w-4 h-4 p-4 items-center justify-center rounded-full cursor-pointer md:hidden"
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
                    deleteUserWishlist(product._id);
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
                className="w-[100%] max-w-[500px] "
              />
            </div>
            <div className="mt-5 ">
              <div>
                <h1 className="font-bold text-[21px]">{product?.title}</h1>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Rating
                        name="half-rating-read"
                        value={product?.rating ?? 0}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <p className="opacity-50 text-sm ml-3">
                        ({product?.ratingCount} Reviews)
                        <span className="ml-1 md:ml-3">|</span>
                      </p>
                    </div>

                    <div className="text-sm ml-1 md:ml-3">
                      {product?.stock ? (
                        <p className="text-[#007427]">
                          In Stock ({product?.stock})
                        </p>
                      ) : (
                        <p className="text-redAccent">Out of Stock</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-0">
                  <h1 className="text-[24px]">
                    $
                    {product?.price != null && product?.discount != null
                      ? (
                          product.price -
                          product.price * (product.discount / 100)
                        ).toFixed(2)
                      : product?.price}
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
                  <div className="border-[1px] bg-white border-gray-600  w-full h-11 rounded-md col-span-3 grid grid-cols-4 cursor-pointer">
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
                      <AddIcon className="text-white cursor-pointer" />
                    </button>
                  </div>
                  <button
                    className="bg-redAccent text-white w-full h-11 shadow-lg rounded-md col-span-4 cursor-pointer"
                    onClick={() => toggleAddToCart("large")}
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
                          deleteUserWishlist(product._id);
                        }
                      }
                    }}
                  >
                    {!isAddedWishlist ? (
                      <FavoriteBorderIcon fontSize="small" />
                    ) : (
                      <FavoriteIcon
                        fontSize="small"
                        style={{ color: "#DB4444" }}
                      />
                    )}
                  </button>
                </div>
                <div>
                  <div className="mt-0 md:hidden">
                    {mobileTabs.map((tab) => (
                      <button
                        className={`${
                          tab.active
                            ? "bg-redAccent border-redAccent border-2   text-white"
                            : "border-[#595959] border-2 text-[#595959] "
                        } rounded-full px-2 py-1.5 mr-1`}
                        key={tab.title}
                        onClick={() => {
                          handleTabClick(tab.title);
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

          <RelatedItems category={product?.category} id={product?._id} />

          <div className="fixed bottom-3 right-0 w-[100%] px-5 grid grid-cols-7 gap-4 md:hidden ">
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
                <AddIcon className="text-white cursor-pointer" />
              </button>
            </div>
            <button
              className="bg-redAccent text-white w-full h-10 shadow-lg rounded-md col-span-4 cursor-pointer"
              onClick={() => toggleAddToCart("mobile")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex-col justify-center align-items-center max-w-[1200px] m-auto ">
          <div className="flex flex-col w-[87%] m-auto">
            <div>
              <div>
                <div className="flex items-center justify-between mb-8">
                  <Skeleton circle={true} width={30} height={30} />
                  <div className="md:hidden">
                    <Skeleton circle={true} width={30} height={30} />
                  </div>
                </div>

                <div className="md:grid grid-cols-5 gap-10 ">
                  <div className="md:col-span-2">
                    <Skeleton className="p-auto h-[270px] sm:h-[350px] md:h[350px] " />
                  </div>

                  <div className="hidden md:block col-span-3">
                    <Skeleton height={50} className="mt-10" />
                    <Skeleton height={20} width="90%" className="mt-2" />
                    <Skeleton height={20} width="40%" className="mt-2" />
                    <Skeleton height={20} width="70%" className="mt-2" />
                    <Skeleton height={20} width="50%" className="mt-2" />
                    <Skeleton height={20} width="40%" className="mt-2" />

                    <div className="flex items-center gap-3 mt-16 mb-8">
                      <Skeleton width={90} height={40} />
                      <div>
                        <Skeleton width={150} height={40} />
                      </div>
                      <Skeleton width={40} height={40} />
                    </div>
                  </div>

                  <div className="md:hidden">
                    <Skeleton height={50} className="mt-10" />
                    <Skeleton height={20} className="mt-2" />
                    <Skeleton height={20} width="40%" className="mt-2" />
                    <Skeleton height={20} width="60%" className="mt-2" />
                    <Skeleton height={20} width="50%" className="mt-2" />
                  </div>
                </div>
              </div>

              <div className="flex gap-1 md:hidden">
                <Skeleton
                  className="mt-8"
                  width={80}
                  height={35}
                  style={{ borderRadius: "30px" }}
                />
                <Skeleton
                  className="mt-8"
                  width={70}
                  height={35}
                  style={{ borderRadius: "30px" }}
                />
              </div>

              <Skeleton height={300} className="mt-10" />
            </div>

            <div className="mt-20">
              <Skeleton height={30} width={120} className="mb-16" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 ">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`skeleton-${index + length}`}
                    className="flex flex-col mb-24"
                  >
                    <Skeleton className="rounded-t-lg p-auto h-[250px] sm:h-[300px] md:h[150px] " />
                    <Skeleton height={20} className="mt-2" />
                    <Skeleton height={20} width="34%" className="mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
