import React from "react"
import {signInWithGoogleAccount} from '../helpers'
import '../styles/sing-in.css'

const SignIn = ({ firebase, provider, image: googleSVG }) => {
  return (
    <div className="container">
      <button
        className="sign-in--button"
        onClick={() => signInWithGoogleAccount(firebase, provider)}
      >
        <img src={googleSVG} alt="google-icon"></img>Sign In With Google Account
      </button>
    </div>
  );
};

export default SignIn;
