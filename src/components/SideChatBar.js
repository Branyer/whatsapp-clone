import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import SearchUser from "./SearchUser";
import Chats from "./Chats";
import { useRealTimeDataBaseChats } from "../hooks/useRealTimeDataBaseChats";
import { UserContext } from "../UserContext";


import "../styles/chat-list.css";

const SideChatBar = ({setSelectedChat}) => {
  //TODO estado compartido entre SearchUser y Chats donde se ven los chats que hacen match con la busqueda
  //tanto con los que no se ha empezado un chat (buscar usuarios de firebase) como con los que ya tienen chat (data.chats)
  const { userRef } = useContext(UserContext);
  
  const { chats, setChats } = useRealTimeDataBaseChats(userRef);

  return (
    <div className="container__chat-list">
      <UserInfo />
      <SearchUser chats={chats} setChats={setChats}/>
      <Chats setSelectedChat={setSelectedChat} chats={chats} setChats={setChats} userRef={userRef}/>
    </div>
  );
};

export default SideChatBar;
