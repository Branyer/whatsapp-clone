import { useState, useEffect } from "react";
import {getChats} from '../helpers'



export const useRealTimeDataBaseChats = (ref) => {
  const [chats, setChats] = useState(null);
  useEffect(() => {
      getChats(ref, setChats)
  }, [ref]);

  return { chats, setChats };
};
