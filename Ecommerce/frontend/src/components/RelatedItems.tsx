import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
//INTERFACES
import { Product } from "../Intefaces/Product";
//MUI

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const RelatedItems = ({ category, id }: any) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [categoryProduct, setCategoryProduct] = useState<Product[]>([]);

  const fetchCategoryProduct = async () => {
    try {
      const res = await fetch(`https://exclusive-ecommerce-app.onrender.com`);
      const { data, success } = await res.json();
      setIsSuccess(success);
      if (success) {
        const filteredProducts = data
          .filter(
            (product: { category: string }) => product.category === category
          )
          .slice(0, 9);
        setCategoryProduct(filteredProducts);
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
                    <Link to={`/product/${product._id}`} key={product._id}>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 mt-14">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={`skeleton-${index + length}`}
              className="flex flex-col mt-24"
            >
              <Skeleton className="rounded-t-lg p-auto h-[250px] sm:h-[300px] md:h[150px] " />
              <Skeleton height={20} className="mt-2" />
              <Skeleton height={20} width="34%" className="mt-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedItems;
