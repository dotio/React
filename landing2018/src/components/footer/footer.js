import React from "react";
import "./footer.scss";
import Fade from "react-reveal/Fade";

const Footer = () => {
  return (
    <footer className="bck_red">
      <Fade delay={500} bottom>
        <div className="footer_logo">The Venue</div>
        <div className="footer_copy">The Venue 2018. All rights reserved</div>
      </Fade>
    </footer>
  );
};

export default Footer;
