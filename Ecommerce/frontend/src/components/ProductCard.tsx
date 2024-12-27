import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
const ProductCard = (product: {
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
  rating: number | undefined;
  ratingCount:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <div
      className="rounded-lg bg-white flex-col relative border-redAccent hover:shadow-md cursor-pointer hover:translate-y-[-4px] transition-transform duration-200 ease-in-out"
      key={product._id}
    >
      <div className="rounded-t-lg p-auto h-[250px] sm:h-[300px] md:h[150px] flex items-center justify-center">
        <img
          src={product.image}
          alt={typeof product.title === "string" ? product.title : undefined}
          className="w-auto h-auto object-cover"
        />
      </div>
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
      <div className="mt-1 ml-2.5 mb-3 flex pb-3">
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.5}
          readOnly
          size="small"
        />
        <p className="font-medium text-[#808080] text-sm ml-2">
          ({product.ratingCount})
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
