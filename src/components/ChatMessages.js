import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../UserContext";
import Message from "./Message";
import background from "../images/whatsapp-background.jpg" 

const ChatMessages = React.memo(({ selectedChat }) => {
  const { key: chatId } = selectedChat;
  const { firebase, email } = useContext(UserContext);
  const [messages, setMessages] = useState(null);

  const refMessages = useRef(null);
  const flag = useRef(true)

  useEffect(() => {
    if (messages && flag.current) {
      refMessages.current.scrollTo({
        left: 0,
        top: refMessages.current.scrollHeight,
        behavior: "smooth",
      });
      flag.current = false;
    }
  });

  useEffect(() => {
    if (chatId === "new-chat") {

      setMessages([]);

    } else {
      firebase.database().ref(`chats/${chatId}/messages`)
        .once("value")
        .then((data) => {
         
          let auxMessages = [];
          data.forEach((message) => {
            auxMessages.push({ ...message.val(), key: message.key });
          });
          flag.current = true;
          setMessages(auxMessages);
          return auxMessages.length;
        })
        .then((count) => {
          firebase.database().ref(`chats/${chatId}/messages`).on("child_added", (message) => {
            if (count > 0) {
              count--;
              return;
            }

            let auxMessage = { key: message.key };

            message.forEach((p) => {
              auxMessage[p.key] = p.val();
            });

            setMessages((actMessages) => [...actMessages, auxMessage]);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      firebase.database().ref(`chats/${chatId}/messages`).off();
    };
  }, [selectedChat, chatId, firebase]);

  return (
    <div className="chat__messages" ref={refMessages} style={{backgroundImage: `url('${background}')`}}>
      {messages &&
        messages.map((m, index) => {
          let first = false;
          if (index > 0) {
            if (m.uId !== messages[index - 1].uId) {
              first = true;
            }
          } else {
            first = true;
          }

          if (email.replace(".", "-") === m.uId) {
            return (
              <Message
                self={true}
                first={first}
                key={m.key}
                timestamp={m.timestamp}
              >
                {m.message}
              </Message>
            );
          }

          return (
            <Message
              self={false}
              first={first}
              key={m.key}
              timestamp={m.timestamp}
            >
              {m.message}
            </Message>
          );
        })}
    </div>
  );
});

export default ChatMessages;
