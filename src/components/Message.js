import React from "react";
import "../styles/message.css";

const SelfMessage = ({ children, self }) => {
  if (self) {
    return (
      <div className="message self">
        <p>{children}</p>
      </div>
    );
  } else {
    return (
      <div className="message not-self">
        <p>{children}</p>
      </div>
    );
  }
};

export default SelfMessage;
