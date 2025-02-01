import { Link, useLocation } from "react-router-dom"; // Import useLocation
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../assets/Logo/Logo Icon.png";

import { useUserStore } from "../../store/product";

const Navbar = () => {
  const location = useLocation(); // Get the current location
  const isWishlistActive = location.pathname === "/wishlist"; // Check if the path is /wishlist
  const isCartActive = location.pathname === "/cart";
  const isAccountAcitve =
    location.pathname === "/account" ||
    location.pathname === "/account/settings";

  const { currentUser } = useUserStore();

  return (
    <nav className="bg-black text-white h-14 flex items-center justify-between pl-2 md:px-2 md:pl-4">
      <div className="flex items-center">
        {/* <button className="text-textPrimary mr-4 ml-4 flex items-center">
          <MenuIcon />
        </button> */}

        <Link to="/">
          <div className="flex items-center">
            <img src={Logo} alt="Exclusive Logo" className="w-9 mr-1 " />
            <button>
              <h1 className="font-bold">EXCLUSIVE</h1>
            </button>
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        {!currentUser && (
          <Link to="/signin">
            <button className="mr-3">Sign In</button>
          </Link>
        )}

        {currentUser ? (
          <Link to={"/wishlist"}>
            <div className=" relative">
              {!isWishlistActive &&
                (currentUser?.wishlists?.length ?? 0) > 0 && (
                  <div className="bg-redAccent absolute left-3 rounded-full w-4 h-4 flex items-center justify-center">
                    <p className="text-white text-xs">
                      {currentUser?.wishlists.length}
                    </p>
                  </div>
                )}
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
            </div>
          </Link>
        ) : (
          <Link to="/signin">
            <button className="mr-3">
              <FavoriteBorderIcon />
            </button>
          </Link>
        )}
        <Link to="/cart">
          <div className="relative">
            {!isCartActive && (currentUser?.carts?.length ?? 0) > 0 && (
              <div className="bg-redAccent absolute left-3 rounded-full w-4 h-4 flex items-center justify-center">
                <p className="text-white text-xs">
                  {currentUser?.carts.length}
                </p>
              </div>
            )}
            <button className="mr-3">
              {isCartActive ? (
                <ShoppingCartIcon />
              ) : (
                <ShoppingCartOutlinedIcon />
              )}
            </button>
          </div>
        </Link>

        {/* <button className="mr-3 text-black bg-white rounded-md flex items-center">
          <DarkModeOutlinedIcon />
        </button> */}

        {currentUser && (
          <Link to="/account">
            {isAccountAcitve ? (
              <button className="mr-3  rounded-full ">
                <AccountCircleIcon className="text-redAccent bg-white rounded-full " />
              </button>
            ) : (
              <button className="mr-3">
                <AccountCircleIcon />
              </button>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
