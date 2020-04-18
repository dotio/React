import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import SideDrawer from "./sideDrawer";
import "./header.scss";

class Header extends Component {
  state = {
    drawerOpen: false,
    headerShow: false
  };

  toggleDrawer = value => {
    this.setState({
      drawerOpen: value
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({
        headerShow: true
      });
    } else {
      this.setState({
        headerShow: false
      });
    }
  };

  render() {
    const { drawerOpen, headerShow } = this.state;

    return (
      <AppBar
        position="fixed"
        style={{ backgroundColor: headerShow ? "#2f2f2f" : "transparent" }}
      >
        <Toolbar className="toolbar">
          <div className="header_logo">
            <div className="header_logo-venue">The Venue</div>
            <div className="header_logo-title">Musical Events</div>
          </div>
          <IconButton
            aria-label="Menu"
            color="inherit"
            onClick={() => this.toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <SideDrawer
            open={drawerOpen}
            onClose={value => this.toggleDrawer(value)}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
