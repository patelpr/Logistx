<template>
  <v-list-item v-if="isSignedIn" link @click="logout()">
    <v-list-item-icon>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Logout</v-list-item-title>
  </v-list-item>
</template>

<script>
import firebase from "firebase";
import { onSignIn } from "../../main";
export default {
  data() {
    return {
      isSignedIn: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isSignedIn = user;
      }
    });
  },
  methods: {
    // (3) Expose $gapi methods
    logout() {
      firebase
        .auth()
        .signOut()
        .then(this.$router.push({ path: "/login" }));
    },
  },
};
</script>

<style></style>
