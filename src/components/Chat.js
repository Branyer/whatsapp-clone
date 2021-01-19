import React, { useState } from "react";
import whatsappSVG from "../images/whatsapp-icon.svg";
import "../styles/chat.css";
import ChatMessages from "./ChatMessages";
import InputMessage from "./InputMessage";
import PartnerChatInfo from "./PartnerChatInfo";

const Chat = ({ selectedChat }) => {
  const [message, setMessage] = useState("");

  if (selectedChat) {
    return (
      <div className="chat">
        <PartnerChatInfo selectedChat={selectedChat} />
        <ChatMessages chatId={selectedChat.key} />
        <InputMessage
          message={message}
          setMessage={setMessage}
          selectedChat={selectedChat}
        />
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
