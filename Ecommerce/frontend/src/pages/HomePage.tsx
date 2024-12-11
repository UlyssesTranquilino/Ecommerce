import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import NewArrival from "../components/NewArrival";
import SearchIcon from "@mui/icons-material/Search";
import Categories from "../components/Categories";
const HomePage = () => {
  interface CategoryList {
    name: String;
    isToggled: boolean;
    icon: React.ReactElement;
  }
  return (
    <div className="mt-10 flex-col justify-center align-items-center max-w-[1200px] m-auto">
      <div
        className="h rounded-l-lg flex justify-between bg-blue-gray-50"
        style={{ width: "90%", margin: "auto" }}
      >
        <input
          type="text"
          id="search"
          placeholder="What are you looking for?"
          className="bg-blue-gray-50 h-9 w-4/5 focus:outline-none rounded-l-lg ml-5"
        ></input>
        <button className="bg-redAccent text-textPrimary w-16 h-10 rounded-tr-md rounded-br-md ">
          <SearchIcon />
        </button>
      </div>

      <div
        className="featured-sections"
        style={{ width: "90%", margin: "auto" }}
      >
        <div>
          <NewArrival />
        </div>
        <div className="mt-20">
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
