import React from "react";
import { Link } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const Navbar = () => {
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
        <p className="mr-3">Sign in</p>
        <Link to={"/wishlist"}>
          <button className="mr-3">
            <FavoriteBorderIcon />
          </button>
        </Link>
        <button className="mr-3">
          <ShoppingCartOutlinedIcon />
        </button>
        <button className="mr-3 text-black bg-white rounded-md flex items-center">
          <DarkModeOutlinedIcon />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
