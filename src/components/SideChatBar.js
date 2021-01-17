import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import SearchUser from "./SearchUser";
import Chats from "./Chats";
import "../styles/chat-list.css";

const SideChatBar = () => {
  //TODO estado compartido entre SearchUser y Chats donde se ven los chats que hacen match con la busqueda
  //tanto con los que no se ha empezado un chat (buscar usuarios de firebase) como con los que ya tienen chat (data.chats)

  return (
    <div className="container__chat-list">
      <UserInfo />
      <SearchUser />
      <Chats  />
    </div>
  );
};

export default SideChatBar;
