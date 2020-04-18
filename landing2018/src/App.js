import React, { Component } from "react";
import "./static/styles.scss";
import Features from "./components/features";
import Header from "./components/header";
import VenueNfo from "./components/venueNfo";
import Hightlights from "./components/highlights";
import Pricing from "./components/prising";
import Location from "./components/location";
import Footer from "./components/footer";
import { Element } from "react-scroll";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Element name="featured">
          <Features />
        </Element>

        <Element name="venuenfo">
          <VenueNfo />
        </Element>

        <Element name="hightlight">
          <Hightlights />
        </Element>

        <Element name="price">
          <Pricing />
        </Element>
        <Element name="location">
          <Location />
        </Element>

        <Footer />
      </div>
    );
  }
}

export default App;
