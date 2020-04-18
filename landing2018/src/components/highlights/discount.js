import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import MyButton from "../UI/myButton";

class Discount extends Component {
  state = {
    discountStart: 0,
    discountStop: 30
  };

  porcentage = () => {
    const { discountStart, discountStop } = this.state;
    if (discountStart < discountStop) {
      this.setState({
        discountStart: discountStart + 1
      });
    }
  };
  componentDidUpdate() {
    setTimeout(() => {
      this.porcentage();
    }, 70);
  }

  render() {
    const { discountStart } = this.state;
    return (
      <div className="center_wrapper">
        <div className="discount_wrapper">
          <Fade top onReveal={() => this.porcentage()}>
            <div className="discount">
              <span className="big">{discountStart} %</span>
              <span className="gray">off</span>
            </div>
          </Fade>
          <Slide right>
            <div className="discount_descr">
              <h3>Purchase tickets before 20th JUNE</h3>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <MyButton
                text="Purchase tickets"
                bck="#fc3f05"
                color="#fff"
                link=""
              />
            </div>
          </Slide>
        </div>
      </div>
    );
  }
}

export default Discount;
