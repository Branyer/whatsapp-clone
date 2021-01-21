import React from "react";
import "../styles/chat-preview.css";

const ChatPreview = ({ chatId, avatar, last_message, username, onClick }) => {
  return (
    <li className="chat-preview" onClick={onClick}>
      <img alt={username} src={avatar}></img>
      <div>
        <span>{username}</span>
        <span>{last_message}</span>
      </div>
    </li>
  );
};

export default ChatPreview;
