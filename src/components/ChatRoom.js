import React, { useEffect, useState, createContext } from "react";
import Loading from "./Loading";
import SideChatBar from "./SideChatBar";
import Chat from "./Chat";
import { UserContext } from "../UserContext";
import { useRealTimeDataBaseUser } from "../hooks/useRealTimeDataBaseUser";
import "../styles/chat-room.css";

const ChatRoom = ({ user, firebase }) => {
  const { data, loading, error, ref } = useRealTimeDataBaseUser(user, firebase);

  if (data) {
    return (
      <>
        <UserContext.Provider value={data}>
          <div className="container__chat-room">
            <SideChatBar firebase={firebase} />
            <Chat />
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
