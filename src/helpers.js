export const signInWithGoogleAccount = (firebase, provider) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      //TODO validar si el usuario está o no en la base de datos, si está cargar los datos si no crearlo
    })
    .catch(function (error) {
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
  arrow.classList.remove("arrow-down");
  arrow.classList.add("arrow-left");
  div.classList.remove("not-visible");
  div.style.zIndex = "50";
  div.classList.add("visible");
};

export const handleBlur = (e) => {
  e.target.placeholder = "Search user by email to start a new chat";

  const div = document.querySelector(".container__search-arrow");
  const arrow = document.querySelector(".arrow-left");
  arrow.classList.remove("arrow-left");
  arrow.classList.add("arrow-down");
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
  firebase
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

  //TODO cambiar esto para las notificaciones (update)
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

  const newMessageId = firebase
    .database()
    .ref(`chats/${chatId}/messages`)
    .push().key;

  let updates = {};
  updates[`chats/${chatId}/messages/${newMessageId}`] = chatMessage;
  updates[`users/${uId}/chats/${chatId}`] = lastMessage;
  updates[`users/${partnerId}/chats/${chatId}`] = lastMessagePartner;

  return firebase.database().ref().update(updates);
};

export const handleSubmitMessage = (
  e,
  selectedChat,
  context,
  setMessage,
  message
) => {
  e.preventDefault();
  sendMessage(
    context.email.replace(".", "-"),
    message.trim(),
    Math.floor(Date.now() / 1000),
    context.username,
    context.profile_picture,
    selectedChat.key,
    selectedChat.profile_picture,
    selectedChat.partnerId,
    selectedChat.username,
    context.firebase
  );

  setMessage("");
};
