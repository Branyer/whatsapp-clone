import React from "react";
import lupaSVG from "../images/lupa.svg";
import arrowPNG from "../images/left-arrow.png"
import "../styles/search-user.css";
import {handleFocus, handleBlur} from "../helpers"


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
