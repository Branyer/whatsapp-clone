import React from "react";
import whatsappSVG from "../images/whatsapp-icon.svg";
import "../styles/chat.css";

const Chat = () => {
  //TODO manejar el cambio de chat

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
