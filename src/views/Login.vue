<template>
  <div class="text-xs-center">
    <v-overlay>
      <v-btn dark fab @click="loginButtonPressed()"
        ><v-icon>mdi-google</v-icon></v-btn
      >
    </v-overlay>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    async loginButtonPressed() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/drive");
      provider.addScope("https://www.googleapis.com/auth/user.emails.read");
      provider.addScope(
        "https://www.googleapis.com/auth/user.organization.read"
      );
      provider.addScope(
        "https://www.googleapis.com/auth/user.phonenumbers.read"
      );
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
   //  provider.setCustomParameters({
    //    prompt: "select_account",
      //});
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          this.$router.push("/");
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
  },
};
</script>

<style></style>
