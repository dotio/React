import React from "react";
import "./location.scss";

const Location = () => {
  return (
    <div className="location_wrapper">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.5519512482942!2d19.233586680227976!3d42.43727097928364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb208164eb5f%3A0x6199d8d7e8d682d3!2sDelta+City!5e0!3m2!1sru!2s!4v1540486077870"
        width="100%"
        height="500"
        frameBorder="0"
        allowFullScreen
        title="map"
      />
      <div className="location_tag">
        <div>Location</div>
      </div>
    </div>
  );
};

export default Location;
