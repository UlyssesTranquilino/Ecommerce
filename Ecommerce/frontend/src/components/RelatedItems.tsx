import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
//INTERFACES
import { Product } from "../Intefaces/Product";
//MUI
import CircularProgress from "@mui/material/CircularProgress";
const RelatedItems = ({ category, id }: any) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);

  const fetchCategoryProduct = async () => {
    console.log("RELATED: ", category);
    try {
      const res = await fetch(`http://localhost:5000`);
      const { data, success } = await res.json();
      setIsSuccess(success);
      if (success) {
        const filteredProducts = data
          .filter(
            (product: { category: string }) => product.category === category
          )
          .slice(0, 9);
        setCategoryProduct(filteredProducts);
        console.log("Category Products: ", filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const handleProductClick = () => {
    window.location.reload();
  };

  return (
    <div className="pb-36">
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          Related Item
        </h1>
      </div>

      {isSuccess ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
            {categoryProduct.map(
              (product: Product) =>
                product._id != id && (
                  <div key={product._id} onClick={handleProductClick}>
                    <Link to={`/product/${product._id}`}>
                      <ProductCard
                        _id={product._id}
                        image={product.image}
                        title={product.title}
                        discount={product.discount}
                        price={product.price}
                        rating={product.rating}
                        ratingCount={product.ratingCount}
                      />
                    </Link>
                  </div>
                )
            )}
          </div>

          <div className="flex justify-center mt-14">
            <Link to={`/category/${category}`}>
              <button className="bg-redAccent text-white px-6 py-2 rounded-sm">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-24">
          <CircularProgress sx={{ color: "#DB4444" }} />
        </div>
      )}
    </div>
  );
};

export default RelatedItems;
