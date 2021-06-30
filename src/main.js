import Vue from "vue"; 
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import { VueMaskDirective } from "v-mask";
import * as Vue2Leaflet from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Vuex from "vuex";
import VueGapi from "vue-gapi";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_DATABASE_URL,
  storageBucket: process.env.VUE_APP_PROJECT_ID,
  messagingSenderId: process.env.VUE_APP_STORAGE_BUCKET,
  appId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  measurementId: process.env.VUE_APP_APP_ID,
  clientId:
    "707547149273-ppdpc82jt17qn9hl0hdmk91e476bpbq1.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/contacts",
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/tasks",
    "https://www.googleapis.com/auth/calendar",
  ],
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/drive/v2/rest",
    "https://tasks.googleapis.com/$discovery/rest?version=v1",
    "https://people.googleapis.com/$discovery/rest?version=v1",
    "https://gmail.googleapis.com/$discovery/rest?version=v1",
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};
firebase.initializeApp(config);

Vue.use(VueGapi, {
  apiKey: config.apiKey,
  clientId: config.clientId,
  discoveryDocs: config.discoveryDocs,
  scope: config.scopes.join(" "),
});

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    console.log(googleUser);
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
        firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}
export async function onSignIn(googleUser) {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      let credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.id_token
      );
      // Sign in with credential from the Google user.
      // [START auth_google_signin_credential]
      firebase
        .auth()
        .signInWithCredential(credential)
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
      // [END auth_google_signin_credential]
      console.log("AFTER FB AUTH", router.app.$gapi.getUserData().id);
    } else {
      console.log("User already signed-in firebase.");
    }
  });
}
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
      console.log(user)
    }, reject);
  })
};
Vue.use(Vuex);
//INPUT FORMATTER : v-mask="'##-##-####'" is equal to 00-00-0000
Vue.directive("mask", VueMaskDirective);
//End Input Formatter

//MAP ELEMENTS
Vue.use(Vue2Leaflet);
Vue.use(L);
//WEBPACK ISSUES MAP ICON HACK BELOW
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
//END MAP ELEMENTS

Vue.config.productionTip = false;

//Authentication for GAPI and Firebase
//https://github.com/msukmanowsky/gapi-firebase

new Vue({
  vuetify,
  Vue2Leaflet,
  L,
  router,
  render: (h) => h(App),
}).$mount("#app");
