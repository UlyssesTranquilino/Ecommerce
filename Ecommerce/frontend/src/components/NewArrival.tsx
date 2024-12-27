import React from "react";
import adPS5 from "../../src/assets/PS5.png";
import adWomen from "../../src/assets/Women's Collection.png";
import adSpeaker from "../../src/assets/Speaker.png";
import adPerfume from "../../src/assets/adPerfume.png";
const NewArrival = () => {
  return (
    <div>
      <div className="flex items-center mt-16">
        <div className="w-4 h-10 bg-redAccent rounded-md"></div>
        <h1 className="text-redAccent font-semibold text-lg ml-3">Featured</h1>
      </div>

      <div className="mt-5 mb-2">
        <h1 className="font-bold text-xl text-textPrimary">New Arrival</h1>
      </div>
      <div className=" mt-10 items-center justify-center grid grid-cols-1 grid-flow-row gap-5 lg:grid-cols-2 overflow-hidden">
        <div className="bg-black rounded-md relative text-white w-full h-72 lg:h-[518px] pl-5 pb-5 cursor-pointer">
          {/* Text Content */}
          <div className="relative z-10 w-44 sm:w-64 flex-col pt-36 sm:pt-28 lg:pt-80 h-72">
            <h1 className="font-semibold text-xl sm:text-[24px] mb-2">
              PlayStation 5
            </h1>
            <p className="text-xs sm:text-sm mb-5">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="text-sm sm:text-lg font-semibold border-b-2 border-white">
              Shop Now
            </button>
          </div>

          <div className="absolute inset-0 z-0 flex justify-end items-center">
            <img
              src={adPS5}
              alt="PS5"
              className="w-52 sm:w-64 lg:w-96 h-96 object-contain "
            />
          </div>
        </div>
        <div className="grid gap-5 ">
          <div className="bg-[#0D0D0D] rounded-md relative text-white w-full h-72 lg:h-[290px] pl-5 pb-10 cursor-pointer">
            {/* Text Content */}

            <div className="relative z-10 w-44 sm:w-64 flex-col pt-28 sm:pt-28 h-72">
              <h1 className="font-semibold text-xl sm:text-[24px] mb-2">
                Women’s Collections
              </h1>
              <p className="text-xs sm:text-sm mb-5">
                Featured woman collections that give you another vibe.
              </p>
              <button className="text-sm sm:text-lg font-semibold border-b-2 border-white">
                Shop Now
              </button>
            </div>

            <div className="absolute inset-0 z-0 flex justify-end items-center">
              <img
                src={adWomen}
                alt="Woman"
                className="w-96 h-52 sm:h-80 object-contain mt-16 sm:mt-5"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 w-ful ">
            <div
              className="rounded-md relative text-white w-full h-52 pl-5 pb-5 cursor-pointer"
              style={{
                background:
                  "radial-gradient(circle, rgba(52,52,52,1) 0%, rgba(22,22,22,1) 46%)",
              }}
            >
              {/* Text Content */}
              <div className="relative z-10 w-44 flex-col pt-24 h-72">
                <h1 className="font-semibold text-lg mb-1">Speakers</h1>
                <p className="text-xs mb-1 pr-10">Amazon wireless speakers</p>
                <button className="text-xs font-semibold border-b-2 border-white">
                  Shop Now
                </button>
              </div>

              <div className="absolute inset-0 z-0 flex justify-center items-center">
                <img
                  src={adSpeaker}
                  alt="PS5"
                  className="w-3/5 h-40 object-contain "
                />
              </div>
            </div>

            <div
              className="rounded-md relative text-white w-full h-52 pl-5 pb-5 cursor-pointer"
              style={{
                background:
                  "radial-gradient(circle, rgba(52,52,52,1) 0%, rgba(22,22,22,1) 46%)",
              }}
            >
              {/* Text Content */}
              <div className="relative z-10 w-44 flex-col pt-24 h-72">
                <h1 className="font-semibold text-lg mb-1">Perfume</h1>
                <p className="text-xs mb-1 pr-14">GUCCI INTENSE OUD EDP</p>
                <button className="text-xs font-semibold border-b-2 border-white">
                  Shop Now
                </button>
              </div>

              <div className="absolute inset-0 z-0 flex justify-center items-center">
                <img
                  src={adPerfume}
                  alt="PS5"
                  className="w-4/5 h-40 object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;

{
  /* <div className="flex-col  h-80" style={{ border: "2px solid red" }}>
<h1 className="font-bold">PlayStation 5</h1>
<p>Black and White version of the PS5 coming out on sale.</p>
</div> */
}
