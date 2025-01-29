import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";

//MOBILE
import ControllerMobile from "./../../src/assets/BannerSlider/Mobile/Controller.png";
import HeadphonesMobile from "./../../src/assets/BannerSlider/Mobile/Headphones.png";
import IphoneMobile from "./../../src/assets/BannerSlider/Mobile/Iphone.png";
import SaleMobile from "./../../src/assets/BannerSlider/Mobile/Sale.png";
import ShippingMobile from "./../../src/assets/BannerSlider/Mobile/Shipping.png";

//DESKTOP
import Controller from "./../../src/assets/BannerSlider/Controller.png";
import Headphones from "./../../src/assets/BannerSlider/Headphones.png";
import Iphone from "./../../src/assets/BannerSlider/Iphone.png";
import Sale from "./../../src/assets/BannerSlider/Sale.png";
import Shipping from "./../../src/assets/BannerSlider/Shipping.png";

//LINK
import { useNavigate } from "react-router-dom";

import "../CSS/AdSlider.css";

//SKELETON
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdSlider = () => {
  const navigate = useNavigate();
  const isMediumBelow = useMediaQuery({ query: "(max-width: 767px)" });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  // State to track when all images are loaded
  const [loaded, setLoaded] = useState(false);

  // List of all images
  const images = isMediumBelow
    ? [
        SaleMobile,
        ShippingMobile,
        IphoneMobile,
        ControllerMobile,
        HeadphonesMobile,
      ]
    : [Sale, Shipping, Iphone, Controller, Headphones];

  useEffect(() => {
    // Preload all images
    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    };

    const loadImages = async () => {
      const promises = images.map(loadImage);
      await Promise.all(promises);
      setLoaded(true); // Set loaded to true once all images are loaded
    };

    loadImages();
  }, [images]);

  return (
    <div className="w-[100%] m-auto">
      {loaded ? (
        <Slider {...settings}>
          {/* Slide 1 */}
          <div
            className="ad-sale"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={isMediumBelow ? SaleMobile : Sale} alt="Sale Banner" />
          </div>

          {/* Slide 2 */}
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src={isMediumBelow ? ShippingMobile : Shipping}
              alt="Shipping Banner"
            />
          </div>

          {/* Slide 3 */}
          <div
            onClick={() => {
              navigate("product/67614cc70e031f9147919e22");
            }}
          >
            <img
              src={isMediumBelow ? IphoneMobile : Iphone}
              alt="iPhone Banner"
            />
          </div>

          {/* Slide 4 */}
          <div
            onClick={() => {
              navigate("product/67614cc70e031f9147919e15");
            }}
          >
            <img
              src={isMediumBelow ? ControllerMobile : Controller}
              alt="Controller Banner"
            />
          </div>

          {/* Slide 5 */}
          <div
            onClick={() => {
              navigate("category/audio");
            }}
          >
            <img
              src={isMediumBelow ? HeadphonesMobile : Headphones}
              alt="Headphones Banner"
            />
          </div>
        </Slider>
      ) : (
        <Skeleton className="rounded-t-lg p-auto h-[150px] sm:h-[300px] md:h-[250px] lg:h-[370px]  " />
      )}
    </div>
  );
};

export default AdSlider;
