import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import EmptyCartImage from "../assets/Images/Empty Cart.png";
import CircularProgress from "@mui/material/CircularProgress";

import { Product } from "../interfaces/Product";
//TOASTER
import toast, { Toaster } from "react-hot-toast";
import { useProductStore, useUserStore } from "../../store/product";

import { Checkbox } from "@mui/material";
import { green } from "@mui/material/colors";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import "react-dropdown/style.css";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    deleteUserWishlist,
    addUserCart,
    deleteUserCart,
    updateUserCart,
  } = useUserStore();
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
  const [filteredCartItems, setFilteredCartItems] = useState(cartItems);

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
        prevItems.filter((item: { _id: any }) => item._id !== product._id)
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
  const [checkItems, setCheckItems] = useState<string[]>();

  const handleAllCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllChecked(!allChecked);
    setCartItems((prevItems) =>
      prevItems.map((product) => {
        return { ...product, toggled: allChecked ? false : true };
      })
    );
  };

  const handleChange = (id: string, quantity: number) => {
    console.log("TOGGLED", id, "  QUANTITY: ", quantity); // Changed event to id for clarity
    setCartItems((prevItems) =>
      prevItems.map((product) => {
        if (product.product._id === id) {
          updateCheckItems(id);
          updateSubtotal(product, quantity);
          return { ...product, toggled: !product.toggled };
        } else {
          return product;
        }
      })
    );

    console.log("SUBTOTLA: ", subTotal);
  };

  const updateCheckItems = (id: string) => {
    setCheckItems((prevItems) => (prevItems ? [...prevItems, id] : [id]));
  };

  const updateSubtotal = (product: any, quantity: number) => {
    console.log("SUBTOTAL UPDATE: ", subTotal);
    if (!product.toggled)
      setSubtotal((prevSubTotal) =>
        parseFloat((prevSubTotal + product.subTotal * quantity).toFixed(2))
      );
    else
      setSubtotal((prevSubTotal) =>
        parseFloat((prevSubTotal - product.subTotal * quantity).toFixed(2))
      );
  };

  const options = ["Edit", "Delete"];
  const defaultOption = options[0];

  const toggleDelete = () => {
    deleteUserCart({ _id: checkItems });

    checkItems?.map((checkItem) => {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product._id != checkItem)
      );
    });

    console.log("MESSAGE STRINGS: ", checkItems);
  };

  const addQuantity = async (productID: string) => {
    const { success, message, updatedCart } = await updateUserCart({
      _id: productID,
      quantity: 1,
    });

    if (success) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.product._id === productID) {
            updateSubtotal(item, item.quantity);
            return { ...item, quantity: item.quantity + 1 }; // Corrected `quanty` to `quantity`
          } else {
            return item;
          }
        })
      );
    }
  };

  const decreaseQuantity = async (productID: string) => {
    const { success, message, updatedCart } = await updateUserCart({
      _id: productID,
      quantity: -1,
    });
    if (success) {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.product._id === productID) {
            return {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }; // Corrected `quanty` to `quantity`
          } else {
            return item;
          }
        })
      );
    }
  };

  // const addQuantity = async (productID: string) => {
  //   const { success, updatedCart } = await updateUserCart({
  //     _id: productID,
  //     quantity: 1,
  //   });

  //   if (success) {
  //     setCartItems((prevItems) =>
  //       prevItems.map((item) => {
  //         if (item.product._id === productID) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         }
  //         return item;
  //       })
  //     );
  //     console.log("Quantity increased successfully!");
  //   } else {
  //     console.error("Failed to increase quantity.");
  //   }
  // };

  // const decreaseQuantity = async (productID: string) => {
  //   const { success, updatedCart } = await updateUserCart({
  //     _id: productID,
  //     quantity: -1,
  //   });

  //   if (success) {
  //     setCartItems((prevItems) =>
  //       prevItems.map((item) => {
  //         if (item.product._id === productID) {
  //           return {
  //             ...item,
  //             quantity: Math.max(item.quantity - 1, 1), // Prevent negative quantity
  //           };
  //         }
  //         return item;
  //       })
  //     );
  //     console.log("Quantity decreased successfully!");
  //   } else {
  //     console.error("Failed to decrease quantity.");
  //   }
  // };

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
        <div className="md:grid  md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mt-10  relative">
              <div className="w-4 h-10 bg-redAccent rounded-md"></div>
              <h1 className="text-redAccent font-semibold text-lg xs:text-xl ml-3">
                Shopping Cart{" "}
                <span className="text-gray-600">
                  {"(" + cartItems.length + ")"}
                </span>
              </h1>

              <div
                className="cursor-pointer absolute right-5 md:right-2 flex h-7 w-7 items-center justify-center bg-gray-200 rounded-full"
                onClick={toggleDelete}
              >
                <DeleteOutlineIcon fontSize="small" />
              </div>
            </div>

            <div className="mt-14">
              <div className="grid gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className=" w-full h-auto flex items-center border-y-2 border-b-gray-200 bg-white relative"
                  >
                    <Checkbox
                      checked={item.toggled}
                      onChange={() =>
                        handleChange(item.product._id, item.quantity)
                      }
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
                            className=" xs:w-28 xs:h-28 object-fit"
                          />
                        </div>
                      </Link>

                      <div className="w-36 ml-5 my-5 col-span-3">
                        <h1 className="text-ellipsis line-clamp-1 overflow-hidden text-xs ">
                          {item.product.title}
                        </h1>
                        {item.color && (
                          <p
                            className="text-xs bg-gray-200 rounded-sm flex h-auto w-cover
                     p-1 mt-1"
                            style={{ width: `${item.color.length * 8.5}px` }}
                          >
                            {item.color}
                          </p>
                        )}

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
                              <button
                                className="text-xs border-r-[1px] border-gray-500 px-2"
                                onClick={() =>
                                  decreaseQuantity(item.product._id)
                                }
                              >
                                -
                              </button>
                              <div className="text-xs">{item.quantity}</div>
                              <button
                                className="text-xs border-l-[1px] border-gray-500 px-2"
                                onClick={() => addQuantity(item.product._id)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="absolute  right-0 flex h-6 w-6 items-center justify-center bg-red-500 rounded-full">
                      <DeleteOutlineIcon className="text-white " fontSize="2" />
                    </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed md:relative h-24 w-[90%] bottom-10 bg-gray-100 md:h-80 md:pt-12 p-4 ">
            <div className="hidden mb-12 md:flex md:items-center ">
              <h1 className="text-redAccent font-semibold text-md xs:text-xl">
                Order Summary
              </h1>
            </div>
            <div className="flex items-center justify-between ">
              <div className="flex items-center relative mb-1">
                <Checkbox
                  checked={allChecked}
                  onChange={handleAllCheckChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: "primary",
                    "&.Mui-checked": {
                      color: green[600],
                    },
                    position: "absolute",
                    left: -10,
                  }}
                />
                <h1 className="ml-8">All</h1>
              </div>
              <div className="mr-1 md:mr-0 md:hidden">
                <h1>Subtotal: ${subTotal.toLocaleString()}</h1>
              </div>
            </div>
            <div className="mr-1 md:block  hidden mb-1">
              <h1>Subtotal: ${subTotal.toLocaleString()}</h1>
            </div>

            <div className="mb-1">
              <h1>Shipping: Free</h1>
            </div>
            <div className="flex items-center w-[100%] md:mt-4">
              <button className="bg-redAccent h-12 w-[100%] rounded-md text-white px-3  bottom-0">
                Check Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={EmptyCartImage} // Renamed for clarity
            alt="Empty Cart"
            className="w-64 mt-20"
          />
          <div className="text-center mt-10">
            <h1 className="font-extrabold text-redAccent text-lg">
              Your Cart is Empty!
            </h1>
            <p className="p-3 w-56 text-gray-700 text-sm">
              Start shopping to add items to your cart.
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
function setWishlistItems(arg0: (prevItems: any) => any) {
  throw new Error("Function not implemented.");
}
