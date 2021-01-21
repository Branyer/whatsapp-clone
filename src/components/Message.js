import React from "react";
import "../styles/message.css";

const SelfMessage = ({ children, self, first }) => {

    return (
      <div className={`message ${self ? 'self' : 'not-self'}`}>
        <p className={first ? 'first' : null}>{children}</p>
      </div>
    );
  
};

export default SelfMessage;
