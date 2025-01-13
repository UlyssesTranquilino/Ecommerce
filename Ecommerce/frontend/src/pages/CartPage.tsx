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

  const [allChecked, setAllChecked] = useState(false);
  const [subTotal, setSubtotal] = useState(0);

  const handleAllCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(!allChecked);
    setCartItems((prevItems) =>
      prevItems.map((product) => {
        return { ...product, toggled: allChecked ? false : true };
      })
    );
  };

  const handleChange = (id: string) => {
    console.log("TOGGLED", id); // Changed event to id for clarity
    setCartItems((prevItems) =>
      prevItems.map((product) => {
        if (product.product._id === id) {
          if (!product.toggled)
            setSubtotal((prevSubTotal) =>
              parseFloat((prevSubTotal + product.subTotal).toFixed(2))
            );
          else
            setSubtotal((prevSubTotal) =>
              parseFloat((prevSubTotal - product.subTotal).toFixed(2))
            );
          return { ...product, toggled: !product.toggled };
        } else {
          return product;
        }
      })
    );
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
            <h1 className="text-redAccent font-semibold text-lg xs:text-xl ml-3">
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
                    checked={item.toggled}
                    onChange={() => handleChange(item.product._id)}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{
                      color: "primary",
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />

                  <div className="ml-2 w-full grid grid-cols-5">
                    <Link to={`/product/${item.product._id}`}>
                      <div className="rounded-t-lg w-full flex items-center justify-center py-2 h-full ">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-20 h-20 xs:w-28 xs:h-28 object-cover"
                        />
                      </div>
                    </Link>

                    <div className="w-36 ml-5 my-5 col-span-3">
                      <h1 className="text-ellipsis line-clamp-1 overflow-hidden text-xs ">
                        {item.product.title}
                      </h1>
                      <p
                        className="text-xs bg-gray-200 rounded-sm flex h-auto w-cover
                     p-1 mt-1"
                        style={{ width: `${item.color.length * 8.5}px` }}
                      >
                        {item.color}
                      </p>

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

                        <div className="absolute right-0">
                          <div className="flex gap-2 items-center border-[1px]  border-gray-500">
                            <button className="text-xs border-r-[1px] border-gray-500 px-2">
                              -
                            </button>
                            <div className="text-xs">{item.quantity}</div>
                            <button className="text-xs border-l-[1px] border-gray-500 px-2">
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 flex justify-end h-20 ">
                      <button className="text-xs text-gray-600">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fixed h-24 w-[90%] bottom-0 bg-white ">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  checked={allChecked}
                  onChange={handleAllCheckChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: "primary",
                    "&.Mui-checked": {
                      color: green[600],
                    },
                  }}
                />
                <h1>All</h1>
              </div>
              <div className="mr-20">
                <h1>Subtotal: ${subTotal.toLocaleString()}</h1>
              </div>
            </div>
            <div className="flex items-center w-[100%] ">
              <button className="bg-redAccent h-12 w-[100%] rounded-md text-white px-3  bottom-0">
                Check Out
              </button>
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
