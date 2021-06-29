<template>
  <v-list-item v-if="isSignedIn" link @click="logout()">
    <v-list-item-icon>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Logout</v-list-item-title>
  </v-list-item>
  <v-list-item v-else link @click="login()">
    <v-list-item-icon>
      <v-icon>mdi-door</v-icon>
    </v-list-item-icon>
    <v-list-item-title>Login</v-list-item-title>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
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
    // (2) Subscribe to authentication status changes
    this.$gapi.listenUserSignIn((isSignedIn) => {
      this.isSignedIn = isSignedIn;
    });
  },
  methods: {
    // (3) Expose $gapi methods
    async login() {
      await this.$gapi.login().then(({ currentUser }) => {
        onSignIn(currentUser.getAuthResponse());
      });
      this.$router.push("/");
    },
    async logout() {
      await this.$gapi.logout().then(() => {
        return firebase.auth().signOut();
      });
    },
  },
};
</script>

<style></style>
