<template>
  <v-layout row wrap>
    <v-overlay>
      <div id="firebaseui-auth-container" class="pa-12"></div>
    </v-overlay>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
