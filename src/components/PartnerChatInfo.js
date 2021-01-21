import React from "react";
import backBtn from '../images/boton-de-play2.png'

const handleClick = ({target}) => {
  const chat = target.parentElement.parentElement;
  chat.style.zIndex = '-1';
}

const PartnerChatInfo = ({ selectedChat }) => {
  const { username, profile_picture } = selectedChat;
  return (
    <div className="chat__user-info">
      <img className="user-info__image" alt="profile" title={username} src={profile_picture}></img>
      <span>{username}</span>
      <img className="back-arrow" alt="back" src={backBtn} onClick={handleClick}></img>
    </div>
  );
};

export default PartnerChatInfo;
