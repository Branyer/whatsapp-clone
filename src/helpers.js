export const signInWithGoogleAccount = (firebase, provider) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // // The signed-in user info.
      // var user = result.user;
      // ...
      //TODO validar si el usuario está o no en la base de datos, si está cargar los datos si no crearlo
    })
    .catch(function (error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      console.log(error);
      // ...
    });
};

export const getUserData = (database, id) => {
  return database.ref(`users/${id}`).once("value");
};

export const setNewUser = (database, userData) => {
  database.ref(`users/${userData.email.replace(".", "-")}`).set(userData);
};

export const handleFocus = (e) => {
  e.target.placeholder = "";
  const div = document.querySelector(".container__search-arrow");
  const arrow = document.querySelector(".arrow-down");
  arrow?.classList.remove("arrow-down");
  arrow?.classList.add("arrow-left");
  div.classList.remove("not-visible");
  div.style.zIndex = "50";
  div.classList.add("visible");
};

export const handleBlur = (e) => {
  e.target.placeholder = "Search user by email to start a new chat";
  const div = document.querySelector(".container__search-arrow");
  const arrow = document.querySelector(".arrow-left");
  arrow?.classList.remove("arrow-left");
  arrow?.classList.add("arrow-down");
  div.classList.remove("visible");
  div.classList.add("not-visible");
  setTimeout(() => {
    div.style.zIndex = "-1";
  }, 300);
};

export const sendMessage = (
  uId,
  message,
  timestamp,
  username,
  profile_picture,
  chatId,
  chatProfilePicture,
  partnerId,
  partnerUsername,
  firebase,
  setSelectedChat
) => {
  if (!message) return;

  const chatMessage = {
    uId,
    message,
    timestamp,
    username,
    profile_picture,
    read: true,
  };

  const lastMessage = {
    last_message: message,
    profile_picture: chatProfilePicture,
    timestamp,
    unreadMessages: 0,
    username: partnerUsername,
    partnerId,
  };

  const lastMessagePartner = {
    last_message: message,
    profile_picture: profile_picture,
    timestamp,
    unreadMessages: 0,
    username: username,
    partnerId: uId,
  };
  let updates = {};
  if (chatId === "new-chat") {
    const newChatId = firebase.database().ref("chats").push().key;

    const newChat = {};
    newChat[partnerId] = true;
    newChat[uId] = true;

    const newMessageId = firebase
      .database()
      .ref(`chats/${newChatId}/messages`)
      .push().key;

    updates[`chats/${newChatId}`] = newChat;
    // setSelectedChat({ key: newChatId, partnerUsername, chatProfilePicture, partnerId })
    firebase.database().ref().update(updates).then((e) => {

      let updates={};

      updates[`chats/${newChatId}/messages/${newMessageId}`] = chatMessage;
      updates[`users/${uId}/chats/${newChatId}`] = lastMessage;
      updates[`users/${partnerId}/chats/${newChatId}`] = lastMessagePartner;
      firebase.database().ref().update(updates)
    })
  } else {
    const newMessageId = firebase
      .database()
      .ref(`chats/${chatId}/messages`)
      .push().key;

    updates[`chats/${chatId}/messages/${newMessageId}`] = chatMessage;
    updates[`users/${uId}/chats/${chatId}`] = lastMessage;
    updates[`users/${partnerId}/chats/${chatId}`] = lastMessagePartner;
    firebase.database().ref().update(updates);
  }
};

export const handleSubmitMessage = (
  e,
  selectedChat,
  context,
  setMessage,
  message,
  setSelectedChat
) => {
  e.preventDefault();
  sendMessage(
    context.email.replace(".", "-"),
    message.trim(),
    Math.floor(Date.now()),
    context.username,
    context.profile_picture,
    selectedChat.key,
    selectedChat.profile_picture,
    selectedChat.partnerId,
    selectedChat.username,
    context.firebase,
    setSelectedChat
  );

  setMessage("");
};

export const getChats = (ref, setChats) => {
  ref
    .child("chats")
    .orderByChild("timestamp")
    .once("value")
    .then((snapshot) => {
      const values = [];
      snapshot.forEach((element) => {
        values.push({ ...element.val(), key: element.key });
      });

      setChats(Array.from(values.reverse()));
      return 1;
    })
    .catch((error) => console.log(error));
};
