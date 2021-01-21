import React, { useEffect } from "react";
import ChatPreview from "./ChatPreview";
import "../styles/preview-chat-list.css";

const handleClick = ({target}) => {

 const chat = document.querySelector('.chat')
  
 if(chat) chat.style.zIndex = '100';
  

};
const Chats = ({ setSelectedChat, chats, setChats, userRef }) => {
  useEffect(() => {
    userRef.child("chats").on("child_changed", (message) => {
      if (chats) {
        const data = { ...message.val(), key: message.key };

        const auxChat = [...chats];

        const index = auxChat.findIndex((e) => e.key === data.key);

        auxChat[index] = data;
        auxChat.sort((a, b) => b.timestamp - a.timestamp);
        setChats(auxChat);
      }
    });

    userRef
      .child("chats")
      .once("value")
      .then((data) => {
        return data.numChildren();
      })
      .then((count) => {
        userRef.child("chats").on("child_added", (chat) => {
          if (count > 0) {
            count--;
            return;
          }

          let auxChat = { key: chat.key };
          
          chat.forEach((p) => {
            auxChat[p.key] = p.val();
          });

          console.log(auxChat)

          if(chats[0].key === "new-chat"){
            setChats([auxChat]);
            setSelectedChat(auxChat);
          } else {
            setChats((actChats) => [auxChat, ...actChats]);
          }

        });

        // console.log(chat.val());
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
              onClick={(e) => {
                setSelectedChat({ key, username, profile_picture, partnerId });
                handleClick(e);
              }}
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
