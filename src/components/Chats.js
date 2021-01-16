import React from "react";
import ChatPreview from "./ChatPreview";
import '../styles/preview-chat-list.css'

const Chats = ({ chats }) => {
  console.log(chats);
  return (
    <ul className="preview-chat-list">
      {chats.map(({ id, username, last_message, profile_image }) => (
        <ChatPreview
          key={id}
          avatar={profile_image}
          last_message={last_message}
          username={username}
        />
      ))}
    </ul>
  );
};

export default Chats;
