import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { scroller } from "react-scroll";
const SideDrawer = props => {
  const scrollToEl = el => {
    scroller.scrollTo(el, {
      duration: 1500,
      delay: 100,
      smooth: true,
      offset: -150
    });
    props.onClose(false);
  };

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.onClose(false)}
    >
      <List component="nav">
        <ListItem button onClick={() => scrollToEl("featured")}>
          Events starts in
        </ListItem>
        <ListItem button onClick={() => scrollToEl("venuenfo")}>
          Venue NFO
        </ListItem>
        <ListItem button onClick={() => scrollToEl("hightlight")}>
          Hightligts
        </ListItem>
        <ListItem button onClick={() => scrollToEl("price")}>
          Pricing
        </ListItem>
        <ListItem button onClick={() => scrollToEl("location")}>
          Location
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
