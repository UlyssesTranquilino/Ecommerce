import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useUserStore } from "../../store/product";
import { Link } from "react-router";

const Footer = () => {
  const { currentUser } = useUserStore();
  const [email, setEmail] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendEmail();
    }
  };

  const handleSendEmail = () => {
    setEmail("");
    alert(
      "This is a sample e-commerce site. The search feature is not functional yet."
    );
  };

  return (
    <footer className="text-white bg-black pb-12 bottom-0 w-full mt-32 ">
      <div className="p-7 md:flex md:gap-12 md:p-16 max-w-[1200px] m-auto relative">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-white rounded-full flex items-center justify-center w-8 h-8 absolute right-10 cursor-pointer md:w-12 md:h-12 hover:bg-gray-200"
        >
          <ArrowUpwardIcon className="text-black" />
        </div>
        <div className="mt-10 md:mt-0">
          <div className="flex gap-10 flex-col md:flex-row">
            <div>
              <div>
                <h1 className="font-[600]">Exclusive</h1>
                <p className="my-3">Subsribe</p>

                <p className="text-sm mb-2">Get 10% off your first order</p>
                <div className="rounded-lg flex items-center justify-between border-[1px] border-white text-gray-400 w-56">
                  <input
                    type="email"
                    id="search"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} // Handle Enter key press
                    className=" h-8 text-sm w-4/5 focus:outline-none rounded-l-lg ml-5 mt-[3px] bg-black"
                  ></input>

                  <button
                    onClick={handleSendEmail}
                    className="text text-sm-textPrimary  w-12 h-8 rounded-tr-md rounded-br-md "
                  >
                    <SendOutlinedIcon
                      fontSize="small"
                      className="text-gray-100"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h1 className="mb-2">Support</h1>
              <p className="text-sm">123 Main Street, Downtown, New York</p>
              <p className="text-sm">+88015-88888-9999</p>
            </div>
          </div>

          <div className="mt-7 md:mt-5">
            <h1>Account</h1>
            <div className="text-sm flex flex-col mt-4 gap-3">
              {currentUser && (
                <Link to="/account">
                  <p className="cursor-pointer hover:underline">My Account</p>
                </Link>
              )}

              {!currentUser && (
                <Link to="/signin">
                  <p className="cursor-pointer hover:underline">
                    Sign in / Register
                  </p>
                </Link>
              )}
              <Link to="/cart">
                <p className="cursor-pointer hover:underline">Cart</p>
              </Link>

              {currentUser ? (
                <Link to="/wishlist">
                  <p className="cursor-pointer hover:underline">Wishlist</p>
                </Link>
              ) : (
                <Link to="/signin">
                  <p className="cursor-pointer hover:underline">Wishlist</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
