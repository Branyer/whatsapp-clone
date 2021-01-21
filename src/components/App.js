import React from "react";
import firebase from "../firebase-config";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import Loading from "./Loading";
import ChatRoom from "./ChatRoom";
import "../styles/styles.css";
import googleSVG from "../images/buscar.svg";

const provider = new firebase.auth.GoogleAuthProvider();

const App = () => {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (user) {
    return <ChatRoom user={user} firebase={firebase} />;
  } else if (loading) {
    return <Loading />;
  } else if (error) {
    return <pre>{error}</pre>;
  } else {
    return <SignIn image={googleSVG} firebase={firebase} provider={provider} />;
  }
};
export default App;
