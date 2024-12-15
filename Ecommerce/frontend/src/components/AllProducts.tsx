import { useEffect } from "react";
//Zustand
import { useProductStore } from "../../store/product";

const AllProducts = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("PRO: ", products);
  return (
    <div>
      <div className="flex items-center">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">
          All Products
        </h1>
      </div>
      <div className="mt-5 mb-10">
        <h1 className="font-bold text-2xl">Explore All Products</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10">
        {products.map((product) => (
          <div className="rounded-md bg-white">
            <div className="bg-white">
              <img
                src={product.pictures[0]}
                alt={product.title}
                className="w-[100%]"
              />
            </div>
            <div className="mt-5">
              <h1 className="font-medium">{product.title}</h1>
              <div>
                <p className="text-redAccent">${product.price.toString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
