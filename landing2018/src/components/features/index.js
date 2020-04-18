import React from "react";
import Carousel from "./slider";
import TimeUntil from "./timeUntil";
const Features = () => {
  return (
    <div className="features">
      <Carousel />
      <div className="artist_name">
        <div className="artist_name-wrapper">AC/DC</div>
      </div>
      <TimeUntil />
    </div>
  );
};

export default Features;
