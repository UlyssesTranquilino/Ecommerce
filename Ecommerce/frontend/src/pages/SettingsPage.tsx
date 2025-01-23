import { useState, useEffect } from "react";
import { useProductStore } from "../../store/product";

import PaymentIcon from "@mui/icons-material/Payment";
import InboxIcon from "@mui/icons-material/Inbox";
import { RiTruckLine } from "react-icons/ri";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { useUserStore } from "../../store/product";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const SettingsPage = () => {
  const { currentUser } = useUserStore();
  const { fetchSingleProduct } = useProductStore();
  const { setCurrentUser } = useUserStore();

  const [firstName, setFirstName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <div className="pb-20">
        <div className="max-w-[1200px] m-auto">
          <div className="w-[90%] m-auto mt-10">
            <h1 className="font-semibold text-xl text-redAccent">
              Edit Your Profile
            </h1>
            <div className="mt-10">
              <form className="flex flex-col gap-7">
                <label>
                  Name
                  <input
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    name="email"
                    className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label>
                  Email
                  <input
                    type="text"
                    placeholder="Enter your email"
                    autoComplete="off"
                    name="email"
                    className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <div>
                  Password Changes
                  <div className="flex flex-col gap-2 mt-1">
                    <input
                      type="text"
                      placeholder="Current Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="New Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
