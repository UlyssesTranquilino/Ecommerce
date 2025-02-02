import { useState, useEffect, useMemo } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useProductStore } from "../../../store/product";
import { Link } from "react-router-dom";

const AdminAllProducts = () => {
  const { products, fetchProducts } = useProductStore();
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: string;
  }>({ key: null, direction: "asc" });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig.key !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const handleSort = (sortColumn: string) => {
    let direction = "asc";
    if (sortConfig.key === sortColumn && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: sortColumn, direction });
  };

  function capitalizeFirstLetter(word: string) {
    if (!word) return word; // Handle empty strings
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="relative max-w-[1200px] m-auto p-4 mt-10">
      <div className="font-semibold text-xl">Admin Dashboard</div>
      <div className="flex items-center gap-2 mg:gap-3 mt-3">
        <Link
          to="/admin/create-product/id"
          className=" px-1 xs:px-4 py-2  text-sm border transition-all bg-white text-black border-gray-400 hover:bg-gray-200"
        >
          Create Product
        </Link>

        <div className="cursor-pointer px-1 xs:px-4 py-2 text-sm border transition-all bg-[#DB4444] text-white border-[#DB4444]">
          All Products
        </div>
      </div>

      <div className="mt-10 flex items-center gap-2 mb-10">
        <div className="w-3 h-10 bg-redAccent" />
        <h1 className="text-redAccent font-semibold text-xl">All Products</h1>
      </div>

      {sortedProducts?.length > 0 ? (
        <div>
          {" "}
          <div className="overflow-y-auto">
            <table className="w-[100%] text-sm ">
              <thead className="uppercase bg-gray-100">
                <tr>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-10 py-2 ">
                      PRODUCT
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("title")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "title" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "title" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>{" "}
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      Price
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("price")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "price" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "price" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      BRAND
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("brand")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "brand" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "brand" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      MODEL
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("model")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "model" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "model" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-6 py-2">
                      CATEGORY
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("category")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "category" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "category" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-4 py-2">
                      STOCK
                      <button
                        className="flex flex-col items-center"
                        onClick={() => handleSort("stock")}
                      >
                        <ArrowDropUpIcon
                          className="w-2 -mb-2"
                          style={{
                            color:
                              sortConfig.key === "stock" &&
                              sortConfig.direction === "asc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                        <ArrowDropDownIcon
                          className="w-2 -mt-2"
                          style={{
                            color:
                              sortConfig.key === "stock" &&
                              sortConfig.direction === "desc"
                                ? "#DB4444"
                                : "black",
                          }}
                        />
                      </button>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="flex items-center gap-1 px-8 py-2">
                      ACTION
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="px-8 py-2">
                      <div className="flex items-center justify-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-20 "
                        />
                        {product.title}
                      </div>
                    </td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-6 py-2">
                      {capitalizeFirstLetter(product.brand)}
                    </td>
                    <td className="px-6 py-2">{product.model}</td>
                    <td className="px-6 py-2">
                      {capitalizeFirstLetter(product.category)}
                    </td>
                    <td className="px-4 py-2">{product.stock}</td>
                    <td className="px-8 py-2">
                      <button className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default AdminAllProducts;
