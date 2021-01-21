import React, { useContext, useEffect } from "react";
import ChatPreview from "./ChatPreview";
import "../styles/preview-chat-list.css";

const Chats = ({ setSelectedChat,chats, setChats,userRef }) => {

  useEffect(() => {
    userRef.child("chats").on("child_changed", (message) => {
      if (chats) {
        const data = { ...message.val(), key: message.key };

        const auxChat = [...chats];

        const index = auxChat.findIndex((e) => e.key === data.key);

        auxChat[index] = data;

        setChats(auxChat);
      }
    });

    return () => {
      userRef.child("chats").off();
    };
  }, [chats, userRef, setChats]);

  return (
    <ul className="preview-chat-list">
      {chats &&
        chats.map(
          ({ key, username, last_message, profile_picture, partnerId }) => (
            <ChatPreview
              onClick={(e) =>
                setSelectedChat({ key, username, profile_picture, partnerId })
              }
              key={key}
              chatId={key}
              avatar={profile_picture}
              last_message={last_message}
              username={username}
            />
          )
        )}
    </ul>
  );
};

export default Chats;
