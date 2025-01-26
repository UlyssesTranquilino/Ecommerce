import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WishlistCard from "../components/WishlistCard";
import EmptyWishlistImage from "../assets/Images/Empty Wishlist.png";
import CircularProgress from "@mui/material/CircularProgress";

//TOASTER
import toast, { Toaster } from "react-hot-toast";
import { useProductStore, useUserStore } from "../../store/product";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { currentUser, deleteUserWishlist, addUserCart }: any = useUserStore();
  const { fetchSingleProduct } = useProductStore();

  const [wishlistItems, setWishlistItems] = useState<any[]>([]); // Renamed from categoryProduct
  const [isFetching, setIsFetching] = useState<boolean>(true); // Renamed from isLoading

  useEffect(() => {
    console.log("CURRENT USER: ", currentUser);
    if (currentUser) {
      const fetchWishlistItems = async () => {
        try {
          const fetchedItems = await Promise.all(
            currentUser.wishlists.map(async (itemID: string) => {
              try {
                const data = await fetchSingleProduct(itemID);
                console.log("WISHLIST DATA: ", data);
                return data.data; // Return product data
              } catch (error) {
                console.error(
                  `Error fetching product with ID ${itemID}:`,
                  error
                );
                return null; // Return null for missing products
              }
            })
          );

          // Filter out any null values in case some products were not found
          setWishlistItems(fetchedItems.filter((item) => item !== null));
          console.log("WISHLIST ITEMS: ", wishlistItems);

          setIsFetching(false);
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
          setIsFetching(false);
        }
      };

      fetchWishlistItems();
    } else {
      navigate("/signin");
    }
  }, []);

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

  const toggleAddToCart = async (product: any) => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      let productPrice: number | string;
      if (product?.discount != null)
        productPrice = (
          product?.price -
          product?.price * (product?.discount / 100)
        ).toFixed(2);
      else productPrice = product?.price;

      const { success } = await addUserCart({
        _id: product?._id,
        price: productPrice,
        quantity: 1,
        model: product?.model,
        color: product?.color,
      });

      if (success) {
        toast("✅  Product added to cart!");
      } else {
        toast("Failed added to cart!");
      }
    }
  };

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

      {isFetching ? (
        <div className="flex justify-center mt-24 pt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      ) : wishlistItems.length > 0 ? (
        <div>
          <div className="flex items-center mt-10">
            <div className="w-4 h-10 bg-redAccent rounded-md"></div>
            <h1 className="text-redAccent font-semibold text-xl ml-3">
              Wishlist
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item._id}
                _id={item._id}
                image={item.image}
                title={item.title}
                discount={item.discount}
                price={item.price}
                product={item}
                onDelete={deleteWishlist} // Updated function name
                onAddCart={toggleAddToCart}
              />
            ))}
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
