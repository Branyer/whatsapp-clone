import React, { useContext } from "react";
import sendSVG from "../images/send.svg";
import { UserContext } from "../UserContext";
import { handleSubmitMessage } from "../helpers";

const InputMessage = ({ selectedChat, setMessage, message }) => {
  const context = useContext(UserContext);

  return (
    <form
      className="chat__input-message"
      onSubmit={(e) =>
        handleSubmitMessage(e, selectedChat, context, setMessage, message)
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
  );
};

export default InputMessage;
