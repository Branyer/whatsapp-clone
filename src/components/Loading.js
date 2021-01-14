import React from "react";
import loadingGIF from "../images/tenor-unscreen.gif";
import "../styles/loading.css";

const Loading = () => {
  return (
    <div className="container">
      <img className="loading-gif" alt="loading-gif" src={loadingGIF}></img>
    </div>
  );
};

export default Loading;
