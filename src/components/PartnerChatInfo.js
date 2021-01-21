import React from "react";

const PartnerChatInfo = ({ selectedChat }) => {
  const { username, profile_picture } = selectedChat;
  return (
    <div className="chat__user-info">
      <img alt="profile" title={username} src={profile_picture}></img>
      <span>{username}</span>
    </div>
  );
};

export default PartnerChatInfo;
