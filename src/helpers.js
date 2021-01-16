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
