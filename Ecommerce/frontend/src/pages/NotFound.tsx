import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-[90%] m-auto mt-4 max-w-[1200px] ">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="hover:text-redAccent hover:underline cursor-pointer">
            Home{" "}
          </h1>
        </Link>
        <h1 className="mx-2">/</h1>
        <h1 className="text-redAccent underline cursor-pointer">404 Error</h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="font-bold text-[35px] text-center">404 Not Found</h1>
        <p className="mt-8 text-sm text-center">
          Your visited page not found. You may go home page.
        </p>

        <Link to="/">
          <button className="mt-8 rounded-sm text-white bg-redAccent py-2 px-5">
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
