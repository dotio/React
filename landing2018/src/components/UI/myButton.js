import React from "react";
import Button from "@material-ui/core/Button";
import Payment from "@material-ui/icons/Payment";

const MyButton = props => {
  return (
    <Button
      href={props.link}
      variant="contained"
      size="small"
      style={{ background: props.bck, color: props.color }}
    >
      <Payment />
      {props.text}
    </Button>
  );
};

export default MyButton;
