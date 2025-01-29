import React, { useState, useEffect, useRef } from "react";

import AdSlider from "../components/AdSlider";
import NewArrival from "../components/NewArrival";
import SearchIcon from "@mui/icons-material/Search";
import Categories from "../components/Categories";

import AllProducts from "../components/AllProducts";

//vid: https://www.youtube.com/watch?v=Ejg7es3ba2k
//LINK

//GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom"; // Add semicolon here
const HomePage = () => {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchItem.trim()) {
      navigate(`/search/${searchItem}`);
    }
  };

  const container = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: container });

  useEffect(() => {
    if (searchItem.length > 0) showSearchAnimation();
    else closeSearch();
  }, [searchItem]);

  const showSearchAnimation = contextSafe(() => {
    gsap.to(".btn-close", {
      opacity: 1,
      duration: 0.3,
      scale: 1.1,
      ease: "power2.inOut",
    });
  });

  function closeSearch() {
    gsap.to(".btn-close", {
      opacity: 0,
      duration: 0.3,
      scale: 1,
      ease: "power2.inOut",
    });
  }
  return (
    <div className="mt-10 flex-col justify-center align-items-center max-w-[1200px] m-auto">
      <div
        className="rounded-l-lg flex justify-between items-center bg-blue-gray-50"
        style={{ width: "90%", margin: "auto" }}
      >
        <input
          type="text"
          id="search"
          value={searchItem}
          placeholder="What are you looking for?"
          onChange={(e) => setSearchItem(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="bg-blue-gray-50 h-9 w-4/5 focus:outline-none rounded-l-lg ml-5 mt-[3px]"
        ></input>
        <div className="flex items-center" ref={container}>
          <button
            onClick={() => {
              setSearchItem("");
              closeSearch();
            }}
            className="btn-close w-4 h-4 mr-3 bg-gray-500 rounded-full flex items-center justify-center opacity-0"
          >
            <CloseIcon className="scale-50 text-white" />
          </button>
          <Link to={`/search/${searchItem}`}>
            <button className="bg-redAccent text-textPrimary w-12 sm:w-16 h-10 rounded-tr-md rounded-br-md ">
              <SearchIcon style={{ color: "white" }} />
            </button>
          </Link>
        </div>
      </div>

      <div
        className="featured-sections"
        style={{ width: "90%", margin: "auto" }}
      >
        <div className="mt-10">
          <AdSlider />
        </div>

        <div className="bg-gray-300 mt-10 h-[0.5px] "></div>
        <div className="mt-10">
          <Categories />
        </div>
        <div className="mt-10">
          <NewArrival />
        </div>
        <div className="mt-20">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
