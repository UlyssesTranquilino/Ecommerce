import { useEffect, useState } from "react";
//Zustand
import { useProductStore } from "../../store/product";

//RATING MUI ICONS
import Rating from "@mui/material/Rating";

//HEART ICONS
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

//LINK
import { Link } from "react-router-dom";

const AllProducts = () => {
  interface Product {
    _id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount: number;
    rating: number;
    ratingCount: number;
  }
  const {
    fetchProducts,
    products,
  }: { fetchProducts: Function; products: Product[] } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          All Products
        </h1>
      </div>
      <div className="mt-5 mb-10">
        <h1 className="font-bold text-2xl text-textPrimary">
          Explore All Products
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
        {products.map((product: Product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <div className="rounded-lg bg-white flex-col relative border-redAccent hover:shadow-md cursor-pointer hover:translate-y-[-4px] transition-transform duration-200 ease-in-out ">
              <div className="absolute w-5 right-5 mt-3 h-48  ">
                <div className="bg-[#F5F5F5] flex w-4 h-4 p-4 items-center justify-center rounded-full cursor-pointer ">
                  <FavoriteBorderIcon fontSize="small" />
                </div>
              </div>
              <div className="rounded-t-lg p-auto h-[300px] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-auto h-auto object-cover"
                />
              </div>
              <div className="mt-5 p-3 pb-0">
                <h1 className="font-medium line-clamp-2">{product.title}</h1>
                <div className="mt-3 flex ">
                  {product.discount ? (
                    <>
                      <p className="font-medium text-redAccent mr-2">
                        $
                        {(
                          product.price -
                          product.price * (product.discount / 100)
                        )
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
              <div className="mt-1 ml-2.5 mb-3 flex">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
