import React from "react";
import "../styles/chat-preview.css";

const ChatPreview = ({ avatar, last_message, username, onClick }) => {
  return (
    <li className="chat-preview" onClick={onClick}>
      <img alt={username} src={avatar}></img>
      <div className="chat-preview__info_user">
        <span>{username}</span>
        <span>{last_message}</span>
      </div>
    </li>
  );
};

export default ChatPreview;
