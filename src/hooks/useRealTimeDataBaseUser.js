import { useEffect, useState } from "react";
import { getUserData, setNewUser } from "../helpers";

export const useRealTimeDataBaseUser = (user, firebase) => {
  const [state, setState] = useState({
    data: null,
    ref: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (user) {
      const database = firebase.database();
      const userId = user.email.replace(".", "-");

      setState({ loading: true });

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

          setState({
            data: {
              username: userData.username,
              email: userData.email,
              profile_picture: userData.profile_picture,
            },
            loading: false,
            ref: database.ref(`users/${userData.email.replace(".", "-")}`),
          });
        })
        .catch((error) => {
          setState({ error: error });
        });
    }
  }, [user, firebase]);

  return state;
};
