import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import EmptyWishlistImage from "../assets/Images/Empty Wishlist.png";
import CircularProgress from "@mui/material/CircularProgress";

import { Product } from "../Interfaces/Product";
//TOASTER
import toast, { Toaster } from "react-hot-toast";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]); // Renamed from categoryProduct
  const [isFetching, setIsFetching] = useState<boolean>(true); // Renamed from isLoading

  const fetchWishlistItems = async () => {
    // Renamed from fetchWishlistProduct
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist`);
      const { data, success } = await response.json();

      if (success) {
        setWishlistItems(data);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error); // Updated error message
    } finally {
      setIsFetching(false);
    }
  };

  const removeWishlistItem = async (id: string) => {
    // Renamed from handleDelete
    try {
      const response = await fetch(`http://localhost:5000/api/wishlist/${id}`, {
        method: "DELETE",
      });
      const { success, message } = await response.json();

      if (success) {
        toast.success("Item removed from wishlist!");
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        ); // Renamed to reflect removal of item from wishlist
      } else {
        toast.error(message || "Failed to remove item.");
      }
    } catch (error) {
      console.error("Error deleting wishlist item: ", error); // Updated error message
      toast.error("An error occurred while removing the item.");
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  return (
    <div className="w-[90%] m-auto mt-4 max-w-[1200px] pb-52">
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
      <div className="flex items-center mt-10">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-xl ml-3">Wishlist</h1>
      </div>

      {isFetching ? (
        <div className="flex justify-center mt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item._id}
              _id={item._id}
              image={item.image}
              title={item.title}
              discount={item.discount}
              price={item.price}
              onDelete={removeWishlistItem} // Updated function name
            />
          ))}
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
              Your Wishlist is Empty!
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

export default WishlistPage;
