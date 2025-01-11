import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import EmptyWishlistImage from "../assets/Images/Empty Wishlist.png";
import CircularProgress from "@mui/material/CircularProgress";

import { Product } from "../interfaces/Product";
//TOASTER
import toast, { Toaster } from "react-hot-toast";
import { useProductStore, useUserStore } from "../../store/product";

import { Checkbox } from "@mui/material";
import { green } from "@mui/material/colors";
const CartPage = () => {
  const navigate = useNavigate();
  const { currentUser, deleteUserWishlist, addUserCart } = useUserStore();
  const { fetchSingleProduct } = useProductStore();

  interface Cart {
    product: Product;
    quantity: number;
    subTotal: number;
    model: string | null;
    color: string | null;
    toggled: boolean;
  }
  const [cartItems, setCartItems] = useState<any[]>([]); // Renamed from categoryProduct
  const [isFetching, setIsFetching] = useState<boolean>(true); // Renamed from isLoading

  useEffect(() => {
    if (currentUser) {
      const fetchCartItems = async () => {
        try {
          const fetchedItems = await Promise.all(
            currentUser.carts.map(async (item: any) => {
              try {
                const data = await fetchSingleProduct(item._id);

                return {
                  product: data.data,
                  quantity: item.quantity,
                  subTotal: item.subTotal,
                  model: item.model,
                  color: item.color,
                  toggled: false,
                }; // Return product data
              } catch (error) {
                console.error(
                  `Error fetching product with ID ${item._id}:`,
                  error
                );
                return null; // Return null for missing products
              }
            })
          );

          setCartItems(fetchedItems);

          setIsFetching(false);
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
          setIsFetching(false);
        }
      };

      fetchCartItems();
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    // Logs cartItems after state is updated
    console.log("CART ITEMS UPDATED: ", cartItems);
  }, [cartItems]);

  const deleteWishlist = async (product: any) => {
    const { success, message } = await deleteUserWishlist(product);

    if (success) {
      console.log("PRODUCT REMOVED FROM WISHLIST");

      // Remove the deleted product from local state
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== product._id)
      );

      // Optionally show a success toast
      toast.success("Product removed from wishlist!");
    } else {
      console.error(message);
      toast.error(message || "Failed to remove product from wishlist");
    }
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="w-[90%] m-auto mt-4 max-w-[1200px] pb-52 ">
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "white",
            color: "black",
          },
        }}
      />

      {isFetching ? (
        <div className="flex justify-center mt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      ) : cartItems.length > 0 ? (
        <div>
          <div className="flex items-center mt-10">
            <div className="w-4 h-10 bg-redAccent rounded-md"></div>
            <h1 className="text-redAccent font-semibold text-xl ml-3">
              Shopping Cart{" "}
              <span className="text-gray-600">
                {"(" + cartItems.length + ")"}
              </span>
            </h1>
          </div>
          <div className="mt-14">
            <div className="grid gap-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="w-full h-auto flex items-center border-y-2 border-b-gray-200 bg-white relative"
                >
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      color: "primary",
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />

                  <div className="ml-2 w-full grid grid-cols-4">
                    <Link to={`/product/${item.product._id}`}>
                      <div className="rounded-t-lg w-full flex items-center justify-center py-2 ">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-28 h-28 object-cover"
                        />
                      </div>
                    </Link>

                    <div className="w-36 ml-5 my-5 col-span-3">
                      <h1 className="text-ellipsis line-clamp-1 overflow-hidden text-xs ">
                        {item.product.title}
                      </h1>
                      <div className="text-xs bg-gray-200 rounded-sm w-16 flex h-auto p-1 mt-1">
                        {item.color}
                      </div>

                      <div className="mt-6 flex items-center  ">
                        <h1 className="text-redAccent text-sm">
                          $
                          {(
                            item.product.price -
                            item.product.price *
                              ((item.product.discount
                                ? item.product.discount
                                : 0) /
                                100)
                          )
                            .toFixed(2)
                            .toLocaleString()}
                        </h1>
                        {item.product.discount && (
                          <p className="text-xs text-gray-500 line-through ml-1">
                            ${item.product.price.toString().toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={EmptyWishlistImage} // Renamed for clarity
            alt="Empty Wishlist"
            className="w-40 mt-20"
          />
          <div className="text-center mt-10">
            <h1 className="font-extrabold text-redAccent text-lg">
              Your Cart is Empty!
            </h1>
            <p className="p-3 w-56 text-gray-700 text-sm">
              Find something you love and add it here!
            </p>
            <div className="mt-10">
              <Link to="/">
                <button className="bg-redAccent text-white py-3 px-7 rounded-sm text-sm hover:shadow-md">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
