import React from "react";
import app from "./firebase-config";
import "firebase/auth";
import "./styles.css";
import googleSVG from "./buscar.svg";

const provider = new app.auth.GoogleAuthProvider();

const signInWithGoogleAccount = (app, provider) => 

{



}


const App = () => {
  return (
    <div className="container">
      <button className="sign-in--button" onClick={()=> signInWithGoogleAccount(app, provider)}>
        <img src={googleSVG} alt="google-icon"></img>Sign In With Google
        Account
      </button>
    </div>
  );
};
export default App;
