import React, { useContext } from "react";
import ChatPreview from "./ChatPreview";
import "../styles/preview-chat-list.css";
import { UserContext } from "../UserContext";
import {useRealTimeDataBaseChats} from '../hooks/useRealTimeDataBaseChats'



const Chats = ({setSelectedChat}) => {
  const { userRef } = useContext(UserContext);
  const {chats, setChats} = useRealTimeDataBaseChats(userRef);



  return (
    <ul className="preview-chat-list">
      {chats &&
        chats.map(({ key, username, last_message, profile_picture, partnerId}) => (
          <ChatPreview
            onClick={(e) => setSelectedChat({key,username, profile_picture, partnerId})}
            key={key}
            chatId={key}
            avatar={profile_picture}
            last_message={last_message}
            username={username}
          />
        ))}
    </ul>
  );
};

export default Chats;
