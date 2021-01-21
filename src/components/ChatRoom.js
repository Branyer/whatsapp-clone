import React, { useState } from "react";
import Loading from "./Loading";
import SideChatBar from "./SideChatBar";
import Chat from "./Chat";
import { UserContext } from "../UserContext";
import { useRealTimeDataBaseUser } from "../hooks/useRealTimeDataBaseUser";
import "../styles/chat-room.css";

const ChatRoom = ({ user, firebase }) => {
  const { data, loading, error, ref } = useRealTimeDataBaseUser(user, firebase);
  const [selectedChat, setSelectedChat] = useState(null);

  if (data) {
    return (
      <>
        <UserContext.Provider value={{...data, firebase, userRef: ref}}>
          <div className="container__chat-room">
            <SideChatBar setSelectedChat={setSelectedChat}/>
            <Chat selectedChat={selectedChat} setSelectedChat={setSelectedChat}/>
          </div>
        </UserContext.Provider>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return <div></div>;
};

export default ChatRoom;
