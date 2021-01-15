import React, { useEffect, useState } from "react";
import Loading from './Loading'

const getUserData = (database, id) => {
  return database.ref(`users/${id}`).once("value");
};

const setNewUser = (database, userData) => {
  database.ref(`users/${userData.email.replace(".", "-")}`).set(userData);
};

const ChatRoom = ({ user, firebase }) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const {data, loading, error} = state;

  useEffect(() => {
    if (user) {
      const database = firebase.database();
      const userId = user.email.replace(".", "-");
      setState((pastState) => ({ ...pastState, loading: true }));
      getUserData(database, userId)
        .then((snapshot) => {
          let userData = snapshot.val();
          if (!userData) {
            userData = {
              username: user.displayName,
              email: user.email,
              profile_picture: user.photoURL,
            };
            setNewUser(database, userData);
          }
          setState((pastState) => ({ ...pastState, data: userData, loading:false }));
        })
        .catch((error) => {
          setState((pastState) => ({ ...pastState, error: error }));
        });
    }
  }, [user, firebase]);

  if(data){
      console.log(data.chats['b']);
  }

  if(loading) {
    return (
        <>
            <Loading />
        </>
    )
  }

  return (
    <div>
      <h1>{user.displayName}</h1>
    </div>
  );
};

export default ChatRoom;
