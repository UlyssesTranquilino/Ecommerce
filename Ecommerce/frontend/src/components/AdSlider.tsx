import React from "react";
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

import "../CSS/AdSlider.css";
const AdSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const isMediumBelow = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div>
      <Slider {...settings}>
        <div className="ad-sale">
          {isMediumBelow ? (
            <img src={SaleMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Sale} alt="Sale Banner" />
          )}
        </div>
        <div>
          {isMediumBelow ? (
            <img src={ShippingMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Shipping} alt="Sale Banner" />
          )}
        </div>
        <div>
          {isMediumBelow ? (
            <img src={IphoneMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Iphone} alt="Sale Banner" />
          )}
        </div>
        <div>
          {isMediumBelow ? (
            <img src={ControllerMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Controller} alt="Sale Banner" />
          )}
        </div>
        <div>
          {isMediumBelow ? (
            <img src={HeadphonesMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Headphones} alt="Sale Banner" />
          )}
        </div>
      </Slider>
    </div>
  );
};

export default AdSlider;
