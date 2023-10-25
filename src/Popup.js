import React from "react";
import icons from "./icons.png";
import "./Popup.css";
function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <img
          className="close-btn"
          src={icons}
          alt="close"
          onClick={() => props.setTrigger(false)}
        />
        <h2>
          {"Event: "}
          {props.children[0]}
        </h2>
        <div>
          <h5>
            {"Author of the event: "}
            {props.children[1]}
          </h5>
          <h5>
            {"Email: "}
            {props.children[2]}
          </h5>
          <h5>
            {"Date of event: "}
            {props.children[3]}
          </h5>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
