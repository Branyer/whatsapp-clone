import React from "react";
import lupaSVG from "../images/lupa.svg";
import arrowPNG from "../images/left-arrow.png"
import "../styles/search-user.css";

const handleFocus = (e) => {
  e.target.placeholder = "";
  const div = document.querySelector(".container__search-arrow");
  const arrow = document.querySelector(".arrow-down");
  arrow.classList.remove("arrow-down")
  arrow.classList.add("arrow-left")
  div.classList.remove("not-visible");
  div.style.zIndex = '50';
  div.classList.add("visible");
};

const handleBlur = (e) => {
  e.target.placeholder = "Search user by email to start a new chat";

  const div = document.querySelector(".container__search-arrow");
  const arrow = document.querySelector(".arrow-left");
  arrow.classList.remove("arrow-left")
  arrow.classList.add("arrow-down")
  div.classList.remove("visible");
  div.classList.add("not-visible");
  setTimeout(() => {
    div.style.zIndex = '-1';
  }, 300);
};

const SearchUser = () => {
  return (
    <div className="search-user">
      <div className="container__search-arrow not-visible">
          <img className="arrow-down" alt="left-arrow" src={arrowPNG}></img>
      </div>
      <div className="container__input-search">
        <label htmlFor="search-user">
          <img alt="lens" src={lupaSVG}></img>
        </label>
        <input
          onFocus={(e) => handleFocus(e)}
          onBlur={(e) => handleBlur(e)}
          type="text"
          id="search-user"
          placeholder="Search user by email to start a new chat"
        />
      </div>
    </div>
  );
};

export default SearchUser;
