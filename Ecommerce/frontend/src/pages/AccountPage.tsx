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
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { useUserStore } from "../../store/product";

const AccountPage = () => {
  const { currentUser } = useUserStore();
  const { fetchSingleProduct } = useProductStore();

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

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

      <div className="bg-gray-200 h-3 mt-12"></div>

      <div className="w-[90%] m-auto mt-10 ">
        <h1 className="font-semibold text-lg">More Activities</h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between mt-5 border-2 border-gray-300 p-3 rounded-sm">
            <div className="flex items-center">
              <ChatOutlinedIcon />
              <p className="ml-2 text-sm"> My Reviews</p>
            </div>
            <ArrowForwardIosIcon className="text-gray-500 scale-50" />
          </div>
          <div className="flex items-center justify-between mt-5 border-2 border-gray-300 p-3 rounded-sm">
            <div className="flex items-center">
              <ShoppingBagOutlinedIcon />
              <p className="ml-2 text-sm">Buy Again</p>
            </div>

            <ArrowForwardIosIcon className="text-gray-500 scale-50" />
          </div>
          <div className="flex items-center justify-between border-2 border-gray-300 p-3 rounded-sm">
            <div className="flex items-center">
              <AccessTimeOutlinedIcon />
              <p className="ml-2 text-sm"> Recently Viewed</p>
            </div>

            <ArrowForwardIosIcon className="text-gray-500 scale-50" />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 h-3 mt-12"></div>
      <div className="w-[90%] m-auto mt-10">
        <h1 className="font-semibold text-lg mb-4">Support</h1>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpOutlineOutlinedIcon />
              <p className="ml-2 text-sm">Help Centre</p>
            </div>
            <ArrowForwardIosIcon className="text-gray-500 scale-50" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SupportAgentOutlinedIcon />
              <p className="ml-2 text-sm">Chat with Express</p>
            </div>
            <ArrowForwardIosIcon className="text-gray-500 scale-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
