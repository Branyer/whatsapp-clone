import React, { useContext, useState } from "react";
import whatsappSVG from "../images/whatsapp-icon.svg";
import "../styles/chat.css";
import sendSVG from "../images/send.svg";
import { UserContext } from "../UserContext";

const sendMessage = (
  uId,
  message,
  timestamp,
  username,
  profile_picture,
  chatId,
  chatProfilePicture,
  partnerId,
  partnerUsername,
  firebase
) => {
  if (!message) return;

  const chatMessage = {
    uId,
    message,
    timestamp,
    username,
    profile_picture,
    read: true,
  };

  //TODO cambiar esto para las notificaciones (update)
  const lastMessage = {
    last_message: message,
    profile_picture: chatProfilePicture,
    timestamp,
    unreadMessages: 0,
    username: partnerUsername,
    partnerId,
  };

  const lastMessagePartner = {
    last_message: message,
    profile_picture: profile_picture,
    timestamp,
    unreadMessages: 0,
    username: username,
    partnerId: uId,
  };

  const newMessageId = firebase
    .database()
    .ref(`chats/${chatId}/messages`)
    .push().key;

  let updates = {};
  updates[`chats/${chatId}/messages/${newMessageId}`] = chatMessage;
  updates[`users/${uId}/chats/${chatId}`] = lastMessage;
  updates[`users/${partnerId}/chats/${chatId}`] = lastMessagePartner;

  return firebase.database().ref().update(updates);
};

const Chat = ({ selectedChat }) => {
  //TODO manejar el cambio de chat

  const [message, setMessage] = useState("");
  const { email, username, profile_picture, firebase } = useContext(
    UserContext
  );

  const handleSubmit = (
    e,
    chatId,
    chatProfilePicture,
    partnerId,
    chatUserName
  ) => {
    e.preventDefault();
    sendMessage(
      email.replace(".", "-"),
      message.trim(),
      Math.floor(Date.now() / 1000),
      username,
      profile_picture,
      chatId,
      chatProfilePicture,
      partnerId,
      chatUserName,
      firebase
    );

    setMessage("");
  };

  if (selectedChat) {
    const {
      key: chatId,
      username: chatUserName,
      profile_picture: chatProfilePicture,
      partnerId,
    } = selectedChat;

    return (
      <div className="chat">
        <div className="chat__user-info">
          <img
            alt="profile"
            title={chatUserName}
            src={chatProfilePicture}
          ></img>
          <span>{chatUserName}</span>
        </div>
        <div className="chat__messages"></div>
        <form
          className="chat__input-message"
          onSubmit={(e) =>
            handleSubmit(e, chatId, chatProfilePicture, partnerId, chatUserName)
          }
        >
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
