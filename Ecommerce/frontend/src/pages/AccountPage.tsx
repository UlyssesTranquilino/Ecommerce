import { useState, useEffect } from "react";
import { useProductStore } from "../../store/product";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import PaymentIcon from "@mui/icons-material/Payment";
import InboxIcon from "@mui/icons-material/Inbox";
import { RiTruckLine } from "react-icons/ri";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useUserStore } from "../../store/product";
import { Product } from "../Intefaces/Product";
const AccountPage = () => {
  const { currentUser } = useUserStore();
  const { fetchSingleProduct } = useProductStore();
  const [showWishlists, setShowWishlists] = useState(false);

  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  // useEffect(() => {
  //   if (user.data?._id) {
  //     const fetchWishlistItems = async () => {
  //       try {
  //         const fetchedItems = await Promise.all(
  //           user.data.wishlists.map(async (item) => {
  //             try {
  //               console.log("ITEM ITEM: ", item);
  //               const data = await fetchSingleProduct(item);
  //               return data.data; // Return product data
  //             } catch (error) {
  //               console.error(`Error fetching product with ID ${item}:`, error);
  //               return null; // Return null for missing products
  //             }
  //           })
  //         );
  //         console.log("Fetched Items: ", fetchedItems);

  //         // Filter out any null values in case some products were not found
  //         setWishlistItems(fetchedItems.filter((item) => item !== null));

  //         setShowWishlists(true);
  //       } catch (error) {
  //         console.error("Error fetching wishlist items:", error);
  //         setShowWishlists(true);
  //       }
  //     };

  //     fetchWishlistItems();
  //   }
  // }, []);

  return (
    <div>
      <div className="bg-redAccent h-52 relative">
        <div className="flex absolute bottom-0 p-6 justify-center items-center">
          <div className="w-28 h-28 relative">
            <div className="w-24 h-24 bg-[#D9D9D9] rounded-full flex justify-center items-center absolute bottom-0">
              <PersonIcon fontSize="large" className="text-white scale-150" />
            </div>

            <div className="cursor-pointer w-8 h-8 bg-[rgba(0,0,0,0.25)] absolute rounded-full z-10 right-2 bottom-1 flex justify-center items-center">
              <EditIcon className="text-white scale-100" />
            </div>
          </div>
          <div className="text-white text-2xl font-semibold ml-4 mt-5">
            {currentUser?.name}
          </div>
        </div>
        <div className="absolute right-0 p-3">
          <SettingsIcon className="text-white scale-110" />
        </div>
      </div>

      <div className="w-[90%] m-auto mt-10">
        <h1 className="font-semibold text-xl">My Orders</h1>
        <div className="grid grid-cols-4 mt-5">
          <div className="flex flex-col items-center">
            <PaymentIcon fontSize="large" />
            <h1 className="text-sm">To Pay</h1>
          </div>
          <div className="flex flex-col items-center">
            <InboxIcon fontSize="large" />
            <h1 className="text-sm">To Ship</h1>
          </div>
          <div className="flex flex-col items-center">
            <RiTruckLine fontSize={36} />
            <h1 className="text-sm">To Receive</h1>
          </div>
          <div className="flex flex-col items-center">
            <StarBorderIcon fontSize="large" />
            <h1 className="text-sm">To Rate</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 h-3 my-12"></div>

      <div className="w-[90%] m-auto mt-10">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">My Wishlists</h1>
          <button>
            <p className="text-gray-500 ">
              View More{" "}
              <ArrowForwardIosIcon fontSize="small" className="scale-75" />
            </p>
          </button>
        </div>
        {showWishlists && <div>Wishlists {wishlistItems}</div>}
      </div>
    </div>
  );
};

export default AccountPage;
