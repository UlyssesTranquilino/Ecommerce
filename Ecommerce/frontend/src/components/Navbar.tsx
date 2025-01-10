import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSignin, setShowSignin] = useState(true);
  const navigate = useNavigate();

  const location = useLocation(); // Get the current location
  const isWishlistActive = location.pathname === "/wishlist"; // Check if the path is /wishlist

  return (
    <nav className="bg-black text-white h-12 flex items-center justify-between">
      <div className="flex items-center">
        <button className="text-textPrimary mr-4 ml-4 flex items-center">
          <MenuIcon />
        </button>

        <Link to="/">
          <button>
            <h1 className="font-bold">EXCLUSIVE</h1>
          </button>
        </Link>
      </div>

      <div className="flex items-center">
        {showSignin && (
          <Link to="/signin">
            <button className="mr-3">Sign In</button>
          </Link>
        )}
        <Link to={"/wishlist"}>
          <button
            className={`mr-3 ${
              isWishlistActive ? "text-redAccent" : "text-white"
            }`}
          >
            {isWishlistActive ? (
              <FavoriteIcon className="text-redAccent" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </Link>
        <button className="mr-3">
          <ShoppingCartOutlinedIcon />
        </button>

        {/* <button className="mr-3 text-black bg-white rounded-md flex items-center">
          <DarkModeOutlinedIcon />
        </button> */}

        {!showSignin && (
          <Link to="/account">
            <button className="mr-3">
              <AccountCircleIcon />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
