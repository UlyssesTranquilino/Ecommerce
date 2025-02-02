import { useState } from "react";

import { Link, Route, Routes } from "react-router-dom";
import CreateProduct from "../../components/Admin/CreateProduct";
import AdminAllProducts from "./AdminAllProducts";

const Dashboard = () => {
  return (
    <div className="relative max-w-[1200px] m-auto p-4 mt-10">
      <div className="font-semibold text-xl">Admin Dashboard</div>
      <div className="flex items-center gap-2 mg:gap-3 mt-3">
        <div className="cursor-pointer px-1 xs:px-4 py-2 rounded-sm text-sm border transition-all bg-[#DB4444] text-white border-[#DB4444]">
          {" "}
          Create Product
        </div>
        <Link
          to="/admin/all-products/id"
          className="px-1 xs:px-4 py-2 rounded-sm text-sm border transition-all bg-white text-black border-gray-400 hover:bg-gray-200"
        >
          All Products
        </Link>
      </div>
      <CreateProduct />
    </div>
  );
};

export default Dashboard;
