import React from "react";
import { Link } from "react-router-dom";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
//TOASTER
import toast, { Toaster } from "react-hot-toast";
import { useProductStore, useUserStore } from "../../store/product";

interface ProductProps {
  _id: string;
  image: string;
  title: string;
  discount: number;
  price: number;
  product: any;
  onDelete: (product: any) => void;
  onAddCart: (product: any) => void;
}

const WishlistCard: React.FC<ProductProps> = ({
  _id,
  image,
  title,
  discount,
  price,
  product,
  onDelete,
  onAddCart,
}) => {
  const discountedPrice = (price - price * (discount / 100)).toFixed(2);

  return (
    <div
      className="rounded-lg bg-white flex-col relative border-redAccent hover:shadow-md cursor-pointer hover:translate-y-[-4px] transition-transform duration-200 ease-in-out"
      key={_id}
    >
      <div
        className="absolute bg-gray-200 rounded-full items-center justify-center p-1 right-2 top-2"
        onClick={() => onDelete(product)} // Call the parent's delete function
      >
        <DeleteOutlinedIcon fontSize="medium" />
      </div>

      <Link to={`/product/${_id}`}>
        <div className="rounded-t-lg h-[250px] sm:h-[300px] flex items-center justify-center pt-5">
          <img src={image} alt={title} className="w-auto h-auto object-cover" />
        </div>
      </Link>

      <div className="bg-black h-10 text-white flex items-center justify-center text-sm">
        <ShoppingCartOutlinedIcon fontSize="small" />
        <div className="pl-2" onClick={() => onAddCart(product)}>
          Add To Cart
        </div>
      </div>

      <Link to={`/product/${_id}`}>
        <div className="mt-3 p-3 pb-0">
          <h1 className="font-medium line-clamp-2">{title}</h1>
          <div className="mt-3 flex">
            {discount ? (
              <>
                <p className="font-medium text-redAccent mr-2">
                  ${" "}
                  {(price - price * ((discount ? discount : 0) / 100)).toFixed(
                    2
                  )}
                </p>
                <p className="font-medium text-gray-500 line-through">
                  ${price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="font-medium text-redAccent">${price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WishlistCard;
