import React, { Component } from "react";
import "./pricing.scss";
import MyButton from "../../components/UI/myButton";
import Zoom from "react-reveal/Zoom";
class Pricing extends Component {
  state = {
    price: [100, 150, 250],
    positions: ["Balcony", "Medium", "FunZone"],
    descr: [
      "Suas invenire eam an, ne eum meis apeirian. Est fabellas mnesarchum eu, esse sonet reprimique at pro. Primis alterum cotidieque in cum",
      "At iisque repudiandae vel, tale nostrud sanctus mea no. Nec ut saepe signiferumque, debitis",
      "feugiat consequuntur te. Eu alii oratio platonem per, vis et paulo imperdiet persequeris. Has ea inani repudiare. Cum in ipsum invidunt quaerendum, mea ut habeo periculis, ea pro choro democritum."
    ],
    linkTo: ["", "", ""],
    delay: [600, 0, 600]
  };

  showBoxes = () => {
    const { price, positions, descr, linkTo, delay } = this.state;
    return price.map((box, i) => (
      <Zoom key={[i]} delay={delay[i]}>
        <div className="pricing_item">
          <div className="pricing_inner">
            <div className="pricing_title">
              <span className="price-span">${price[i]}</span>
              <span className="positin-span">{positions[i]}</span>
            </div>
            <div className="pricing_descr">{descr[i]}</div>
            <div className="pricing_btn">
              <MyButton
                text="Purchase"
                bck="#fc3f05"
                color="#fff"
                link={linkTo[i]}
              />
            </div>
          </div>
        </div>
      </Zoom>
    ));
  };

  render() {
    return (
      <div className="bck_black">
        <div className="center_wrapper pricing_section">
          <h2>Pricing</h2>
          <div className="pricing_wrapper">{this.showBoxes()}</div>
        </div>
      </div>
    );
  }
}

export default Pricing;
