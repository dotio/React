import React, { Component } from "react";
import Slide from "react-reveal/Slide";

class TimeUntil extends Component {
  state = {
    deadline: "Dec, 16, 2018",
    event: [{ cnt: "", name: "" }]
  };

  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    if (time < 0) {
      console.log("eno");
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));

      this.setState({
        event: [
          { cnt: days, name: "day" },
          { cnt: hours, name: "hs" },
          { cnt: minutes, name: "min" },
          { cnt: seconds, name: "sec" }
        ]
      });
    }
  }

  componentDidMount() {
    const { deadline } = this.state;
    setInterval(() => this.getTimeUntil(deadline), 1000);
  }

  render() {
    const { event } = this.state;
    return (
      <Slide left delay={1000}>
        <div className="countDown_wrapper">
          <div className="countDown_top">Event starts in</div>
          <div className="countDown_bottom">
            {event.map(ev => (
              <div className="countDown_item" key={ev.name}>
                <div className="countDown_day countDown">{ev.cnt}</div>
                <div className="countDown_tag countDown">{ev.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
    );
  }
}

export default TimeUntil;
