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
  const { updateUser } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setIsSuccess(false);
      setMessage("Please fill in all required fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setIsSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 7) {
      setIsSuccess(false);
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    const { success, message } = await updateUser({
      name: name,
      email: email,
      password: currentPassword,
      newPassword: newPassword,
    });

    console.log("SUCCESS: ", success, "  MESSAGE: ", message);

    if (!success) {
      setIsSuccess(false);
      setMessage(message);
    }
  };

  return (
    <div>
      <div className="pb-20">
        <div className="max-w-[1200px] m-auto">
          <div className="w-[90%] m-auto mt-10">
            <h1 className="font-semibold text-xl text-redAccent">
              Edit Your Profile
            </h1>
            <div className="mt-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <label>
                  Name
                  <input
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    name="email"
                    className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                      type="password"
                      placeholder="Current Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      autoComplete="off"
                      name="email"
                      className="border-b-2 w-[100%] pb-1 focus:border-redAccent focus:outline-none text-[16px] mt-1 bg-gray-100 p-3"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>

                {!isSuccess && (
                  <div className="bg-[#FFDCE0] border-2 border-red-800 rounded-sm p-1">
                    <p className="text-red-800 text-sm">{message}</p>
                  </div>
                )}

                <div className="flex justify-around ">
                  <Link to="/account">
                    <button className="text-sm">Cancel</button>
                  </Link>
                  <button
                    type="submit"
                    className="text-white bg-redAccent py-3 text-sm rounded-sm px-6"
                  >
                    Save Changes
                  </button>
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
