import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../UserContext";
import Message from "./Message"

const ChatMessages = React.memo(({ chatId }) => {
  const { firebase, email } = useContext(UserContext);
  const [messages, setMessages] = useState(null);

  const ref = useRef(firebase.database().ref(`chats/${chatId}/messages`));


  useEffect(() => {
    ref.current
      .once("value")
      .then((data) => {
        let auxMessages = [];
        data.forEach((message) => {
          auxMessages.push({ ...message.val(), key: message.key });
        });
        setMessages(auxMessages);
        return auxMessages.length;
      })
      .then((count) => {
        ref.current.on("child_added", (message) => {
          if (count > 0) {
            count--;
            return;
          }

          let auxMessage = {key:message.key}

          message.forEach((p) => {
              auxMessage[p.key] = p.val();
          })

          setMessages((actMessages) => ([...actMessages, auxMessage]))
          
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="chat__messages">

      {messages && messages.map((m) => {

        if(email.replace('.', '-') === m.uId){

          return <Message self={true} key={m.key} timestamp={m.timestamp}>{m.message}</Message>

        }

        return <Message self={false} key={m.key} timestamp={m.timestamp}>{m.message}</Message>

      }
        
      )}

    </div>
  );
});

export default ChatMessages;
