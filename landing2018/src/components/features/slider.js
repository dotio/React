import React from "react";
import Slider from "react-slick";
import "./features.scss";
import ac1 from "../../static/images/ac1.jpg";
import ac2 from "../../static/images/ac2.jpg";
import ac3 from "../../static/images/ac3.jpg";
const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    lazyLoad: "ondemand"
  };

  return (
    <div
      className="carousel-wrapper"
      style={{ height: `${window.innerHeight}px` }}
    >
      <Slider {...settings}>
        <div className="carousel-image-wrapper">
          <div
            className="carousel-image"
            style={{
              background: `url(${ac1})`
            }}
          />
        </div>
        <div className="carousel-image-wrapper">
          <div
            className="carousel-image"
            style={{
              background: `url(${ac2})`
            }}
          />
        </div>
        <div className="carousel-image-wrapper">
          <div
            className="carousel-image"
            style={{
              background: `url(${ac3})`
            }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
