import React, { useState, useEffect } from "react";

export const useRealTimeDataBaseChats = (ref)=>{

    const [chats, setChats] = useState(null);
    
    useEffect(() => {
      ref
        .child("chats")
        .orderByChild("timestamp")
        .once("value")
        .then((snapshot) => {
          const values = [];
          snapshot.forEach((element) => {
            values.push({ ...element.val(), key: element.key });
          });
    
          setChats(values.reverse());
        })
        .catch((error) => console.log(error));
    }, [ref]);

    return {chats, setChats}
}

