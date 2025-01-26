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
const AdSlider = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const isMediumBelow = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className="w-[99%] m-auto">
      <Slider {...settings}>
        <div
          className="ad-sale"
          onClick={() => {
            navigate("/");
          }}
        >
          {isMediumBelow ? (
            <img src={SaleMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Sale} alt="Sale Banner" />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          {isMediumBelow ? (
            <img src={ShippingMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Shipping} alt="Sale Banner" />
          )}
        </div>
        <div
          onClick={() => {
            navigate("product/67614cc70e031f9147919e22");
          }}
        >
          {isMediumBelow ? (
            <img src={IphoneMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Iphone} alt="Sale Banner" />
          )}
        </div>
        <div
          onClick={() => {
            navigate("product/67614cc70e031f9147919e15");
          }}
        >
          {isMediumBelow ? (
            <img src={ControllerMobile} alt="Sale Banner Mobile" />
          ) : (
            <img src={Controller} alt="Sale Banner" />
          )}
        </div>
        <div
          onClick={() => {
            navigate("category/audio");
          }}
        >
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
