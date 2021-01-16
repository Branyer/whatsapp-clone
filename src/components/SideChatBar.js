import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import SearchUser from "./SearchUser";
import Chats from "./Chats";
import "../styles/chat-list.css";

const chats = [
  {
    username: "Nickname",
    last_message: "Hola",
    profile_image:
      "https://lh3.googleusercontent.com/a-/AOh14GjVNbyyG2pveGFxP3ALA3q_t9k4faNhjoUEOuoK2A=s96-c",
  },
  {
    username: "Nickname",
    last_message: "Hola",
    profile_image:
      "https://lh3.googleusercontent.com/a-/AOh14GjVNbyyG2pveGFxP3ALA3q_t9k4faNhjoUEOuoK2A=s96-c",
  },
  {
    username: "Nickname",
    last_message: "Hola",
    profile_image:
      "https://lh3.googleusercontent.com/a-/AOh14GjVNbyyG2pveGFxP3ALA3q_t9k4faNhjoUEOuoK2A=s96-c",
  },
];

const SideChatBar = ({firebase}) => {
  //TODO estado compartido entre SearchUser y Chats donde se ven los chats que hacen match con la busqueda
  //tanto con los que no se ha empezado un chat (buscar usuarios de firebase) como con los que ya tienen chat (data.chats)

  return (
    <div className="container__chat-list">
      <UserInfo firebase={firebase}/>
      <SearchUser />
      <Chats chats={chats} />
    </div>
  );
};

export default SideChatBar;
