import React from "react";
import adPS5 from "../../src/assets/Ad PS5.png";

const NewArrival = () => {
  return (
    <div className="flex mt-10 items-center justify-center">
      <div className="bg-black rounded-md text-white w-full">
        <div className="z-1" style={{ transform: "translateY(100px)" }}>
          <h1 className="font-bold">PlayStation 5</h1>
          <p>Black and White version of the PS5 coming out on sale.</p>
        </div>
        <img src={adPS5} alt="PS5" style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default NewArrival;
