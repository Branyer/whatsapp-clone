import React from "react";
import firebase from "./firebase-config";
import "firebase/auth";
import "./styles.css";
import googleSVG from "./buscar.svg";
import {useAuthState} from 'react-firebase-hooks/auth'

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = (firebase, provider) => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(error);
    // ...
  });
}
const App = () => {

  const [user, loading, error] = useAuthState(firebase.auth());
  console.log(user);
  console.log(error);


  return (
    <div className="container">
      <button className="sign-in--button" onClick={() => SignIn(firebase, provider)}>
        <img src={googleSVG} alt="google-icon"></img>Sign In With Google Account
      </button>
    </div>
  );
};
export default App;
