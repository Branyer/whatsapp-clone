import React from "react";
import whatsappSVG from "../images/whatsapp-icon.svg";
import "../styles/chat.css";
import sendSVG from "../images/send.svg";

const Chat = () => {
  //TODO manejar el cambio de chat

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sending message...");
  };

  if (true) {
    return (
      <div className="chat">
        <div className="chat__user-info">
          <img
            alt="profile"
            title="Branyer Vergara"
            src="https://lh3.googleusercontent.com/a-/AOh14GjVNbyyG2pveGFxP3ALA3q_t9k4faNhjoUEOuoK2A=s96-c"
          ></img>
          <span>Branyer Vergara</span>
        </div>
        {/* https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png */}
        <div className="chat__messages"></div>
        <form className="chat__input-message" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Type a message" />
          <input
            type="submit"
            value=""
            title="send a message"
            style={{ backgroundImage: `url('${sendSVG}')` }}
          />
        </form>
      </div>
    );
  }

  return (
    <div className="no-chat-selected">
      <div>
        <img alt="whatsapp" src={whatsappSVG}></img>
        <span>Select a chat to start messaging</span>
      </div>
    </div>
  );
};

export default Chat;
