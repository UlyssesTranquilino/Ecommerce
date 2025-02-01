import { useState } from "react";

import CreateProduct from "../../components/Admin/CreateProduct";

const Dashboard = () => {
  interface Tab {
    title: string;
    active: boolean;
  }
  const [allTabs, setAllTabs] = useState([
    {
      title: "Create Product",
      active: true,
    },
    {
      title: "All Products",
      active: false,
    },
    {
      title: "All Users",
      active: false,
    },
  ]);

  const toggleTab = (title: string) => {
    setAllTabs((prevTabs) =>
      prevTabs.map((item) =>
        item.title === title
          ? { ...item, active: true }
          : { ...item, active: false }
      )
    );
  };
  return (
    <div className="relative max-w-[1200px] m-auto p-4 mt-10">
      <div className="font-semibold text-xl">Admin Dashboard</div>
      <div className="flex items-center gap-2 mg:gap-3 mt-3">
        {allTabs.map((tab) => (
          <button
            key={tab.title}
            className={`px-1 xs:px-4 py-2 rounded-sm text-sm border transition-all ${
              tab.active
                ? "bg-[#DB4444] text-white border-[#DB4444]"
                : "bg-white text-black border-gray-400 hover:bg-gray-200"
            }`}
            onClick={() => toggleTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div>{allTabs[0].active && <CreateProduct />}</div>
    </div>
  );
};

export default Dashboard;
