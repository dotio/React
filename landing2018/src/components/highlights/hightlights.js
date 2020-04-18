import React from "react";
import Description from "./description";
import Discount from "./discount";
import "./hightslights.scss";

const Hightlights = () => {
  return (
    <div className="hightlight_wrapper">
      <Description />
      <Discount />
    </div>
  );
};

export default Hightlights;
