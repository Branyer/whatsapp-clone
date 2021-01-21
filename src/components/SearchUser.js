import React, { useState, useEffect, useRef, useContext } from "react";
import lupaSVG from "../images/lupa.svg";
import arrowPNG from "../images/left-arrow.png";
import "../styles/search-user.css";
import { handleFocus, handleBlur } from "../helpers";
import { UserContext } from "../UserContext";
import { getChats } from "../helpers";

const searchUser = (e, query, chats, setChats, firebase) => {
  e.preventDefault();

  const auxQuery = query.replace(".", "-").toLowerCase();

  let index = chats.findIndex((c) => c?.partnerId === auxQuery);

  if (index === -1) {
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(query.toLowerCase())
      .once("value", (snap) => {
        if(snap.val()) {
          setChats([{...snap.val()[auxQuery], key:'new-chat', last_message:"Start a new chat", partnerId:auxQuery}])
        }
       
      });
  } else setChats([chats[index]]);
};

const SearchUser = ({ chats, setChats }) => {
  const { firebase, userRef } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const formRef = useRef();

  useEffect(() => {
    if (query === "") {
      getChats(userRef, setChats);
    }
  }, [query, setChats, userRef]);

  return (
    <div className="search-user">
      <form
        onBlur={(e) => handleBlur(e)}
        ref={formRef}
        className="container__input-search"
        onSubmit={(e) => searchUser(e, query, chats, setChats, firebase)}
      >
        <label htmlFor="search-user">
          <img alt="lens" src={lupaSVG}></img>
        </label>
        <input
          value={query}
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e, setQuery)}
          onChange={(e) => setQuery(e.target.value.trim())}
          type="email"
          id="search-user"
          placeholder="Search user by email to start a new chat"
        />
        <div className="container__search-arrow not-visible">
          <input
            type="submit"
            className="arrow-down"
            alt="left-arrow"
            title="press enter and search user by email"
            style={{ backgroundImage: `url('${arrowPNG}')` }}
            value=""
          />
        </div>
      </form>
    </div>
  );
};

export default SearchUser;
