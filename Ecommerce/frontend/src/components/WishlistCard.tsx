import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

//ZUSTAND
import { useProductStore } from "../../store/product";

//MUI ICONS
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

//MUI SNACKBAR
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface State extends SnackbarOrigin {
  open: boolean;
}

const WishlistCard = (product: {
  _id: React.Key | null | undefined;
  image: string | undefined;
  title:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | null
    | undefined;
  discount: number;
  price: number;
}) => {
  //MUI SNACKBAR
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { deleteWishlist, fetchWishlists } = useProductStore();

  const toggleDelete = async (wishlistID: string) => {
    const { success, message } = await deleteWishlist(wishlistID);

    if (success) {
      console.log(message);
      await fetchWishlists();
    } else {
      console.log("ERROR: ", message);
    }
  };
  return (
    <div
      className="rounded-lg bg-white flex-col relative border-redAccent hover:shadow-md cursor-pointer hover:translate-y-[-4px] transition-transform duration-200 ease-in-out"
      key={product._id}
    >
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          message="I love snacks"
          key={vertical + horizontal}
        />
      </div>
      <div
        className="absolute bg-gray-200 rounded-full items-center justify-center p-1 right-2 top-2"
        onClick={() => {
          // product._id && toggleDelete(product._id.toString());
          handleClick({ vertical: "top", horizontal: "center" });
        }}
      >
        <DeleteOutlinedIcon fontSize="medium" />
      </div>
      <Link to={`/product/${product._id}`} key={product._id}>
        <div className="rounded-t-lg p-auto h-[250px] sm:h-[300px] md:h[150px] flex items-center justify-center pt-5">
          <img
            src={product.image}
            alt={typeof product.title === "string" ? product.title : undefined}
            className="w-auto h-auto object-cover"
          />
        </div>
      </Link>
      <div className="bg-black h-10 text-white flex items-center justify-center text-sm">
        <ShoppingCartOutlinedIcon fontSize="small" />
        <div className="pl-2">Add To Cart</div>
      </div>
      <Link to={`/product/${product._id}`} key={product._id}>
        <div className="mt-3 p-3 pb-0">
          <h1 className="font-medium line-clamp-2">{product.title}</h1>
          <div className="mt-3 flex">
            {product.discount ? (
              <>
                <p className="font-medium text-redAccent mr-2">
                  $
                  {(product.price - product.price * (product.discount / 100))
                    .toFixed(2)
                    .toString()}
                </p>
                <p className="font-medium text-gray-500 line-through">
                  ${product.price.toString()}
                </p>
              </>
            ) : (
              <p className="font-medium text-redAccent">
                ${product.price.toString()}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WishlistCard;
function handleDeleteClick(message: string) {
  throw new Error("Function not implemented.");
}
