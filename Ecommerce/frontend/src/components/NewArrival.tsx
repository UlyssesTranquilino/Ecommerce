import adPS5 from "../../src/assets/PS5.png";

import adSpeaker from "../../src/assets/Speaker.png";
import AsusTUF from "../../src/assets/ASUS_TUF.png";
import Appliences from "../../src/assets/Appliences.png";

import { Link } from "react-router";
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
        <Link to="product/67614cc70e031f9147919e2e">
          <div className="bg-black rounded-md relative text-white w-full h-72 lg:h-[518px] pl-5 pb-5 cursor-pointer">
            {/* Text Content */}

            <div
              className="relative z-10 w-44 sm:w-64 flex-col pt-36 sm:pt-28 lg:pt-80 h-72"
              onClick={() => {}}
            >
              <h1 className="font-semibold text-xl sm:text-[24px] mb-2">
                PlayStation 5
              </h1>
              <p className="text-xs sm:text-sm mb-5 pr-20 md:pr-32">
                {" "}
                Next-gen gaming redefined{" "}
              </p>
              <button className="text-sm sm:text-lg font-semibold border-b-2 border-white">
                Shop Now
              </button>
            </div>

            <div className="absolute inset-0 z-0 flex justify-end items-center">
              <img
                src={adPS5}
                alt="PS5"
                className="w-52 sm:w-64 lg:w-96 h-96 object-contain"
              />
            </div>
          </div>
        </Link>

        <div className="grid gap-5 ">
          <Link to="/product/67614cc70e031f9147919e85">
            <div className="bg-[#0D0D0D] rounded-md relative text-white w-full h-72 lg:h-[290px] pl-5 pb-10 cursor-pointer">
              {/* Text Content */}

              <div className="relative z-10 w-44 sm:w-64 flex-col pt-28 sm:pt-28 h-72">
                <h1 className="font-semibold text-xl sm:text-[24px] mb-2">
                  Asus TUF F-17
                </h1>
                <p className="text-xs sm:text-sm mb-5">
                  {" "}
                  Built for speed, power, and all your gaming adventures.
                </p>
                <button className="text-sm sm:text-lg font-semibold border-b-2 border-white">
                  Shop Now
                </button>
              </div>

              <div className="absolute inset-0 z-0 flex justify-end items-center">
                <img
                  src={AsusTUF}
                  alt="Asus TUF F17"
                  className="w-96 h-52 sm:h-80 object-contain mt-16 sm:mt-5 pl-24 md:p-8 mb-10"
                />
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-5 w-ful ">
            <div
              className="rounded-md relative text-white w-full h-52 pl-5 pb-5 cursor-pointer"
              style={{
                background:
                  "radial-gradient(circle, rgba(52,52,52,1) 0%, rgba(22,22,22,1) 46%)",
              }}
            >
              {/* Text Content */}
              <Link to="category/audio">
                <div className="relative z-10 w-44 flex-col pt-24 h-72">
                  <h1 className="font-semibold text-lg mb-1">Speakers</h1>

                  <p className="text-xs sm:text-sm mb-5">
                    High quality sounds.
                  </p>
                  <button className="text-xs font-semibold border-b-2 border-white">
                    Shop Now
                  </button>
                </div>
              </Link>

              <div className="absolute inset-0 z-0 flex justify-center items-center">
                <img
                  src={adSpeaker}
                  alt="Speaker"
                  className="w-3/5 h-40 object-contain "
                />
              </div>
            </div>

            <Link to="/product/67614cc70e031f9147919e98">
              <div
                className="rounded-md relative text-white w-full h-52 pl-5 pb-5 cursor-pointer"
                style={{
                  background:
                    "radial-gradient(circle, rgba(52,52,52,1) 0%, rgba(22,22,22,1) 46%)",
                }}
              >
                {/* Text Content */}
                <div className="relative z-10 w-44 flex-col pt-24 h-72">
                  <h1 className="font-semibold text-lg mb-1">Appliences</h1>
                  <p className="text-xs mb-1 pr-14">
                    Engineered for efficiency.
                  </p>
                  <button className="text-xs font-semibold border-b-2 border-white">
                    Shop Now
                  </button>
                </div>

                <div className="absolute inset-0 z-0 flex justify-center items-center">
                  <img
                    src={Appliences}
                    alt="Appliences"
                    className="w-4/5 h-40 object-contain "
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
