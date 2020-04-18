import React from "react";
import "./venueNfo.scss";
import Place from "@material-ui/icons/Place";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Zoom from "react-reveal/Zoom";

const VenueNfo = () => {
  return (
    <div className="bck_black">
      <div className="center_wrapper">
        <div className="vn_wrapper">
          <Zoom duration={500}>
            <div className="vn_item">
              <div className="vn_outer">
                <div className="vn_inner">
                  <div className="vn_icon_square bck_red">
                    <div className="vn_icon">
                      <i className="material-icons">
                        <CalendarToday />
                      </i>
                    </div>
                  </div>

                  <div className="vn_title">Event Date & Time</div>
                  <div className="vn_desc">7 August 2018 @10.00pm</div>
                </div>
              </div>
            </div>
          </Zoom>

          <Zoom duration={500} delay={500}>
            <div className="vn_item">
              <div className="vn_outer">
                <div className="vn_inner">
                  <div className="vn_icon_square bck_orange">
                    <div className="vn_icon">
                      <i className="material-icons">
                        <Place />
                      </i>
                    </div>
                  </div>

                  <div className="vn_title">Event Location</div>
                  <div className="vn_desc">
                    345 Speer Street Oakland, CA 9835
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </div>
      </div>
    </div>
  );
};

export default VenueNfo;
