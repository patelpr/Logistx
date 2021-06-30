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
  apiKey: "AIzaSyDmuK9IeyTyM7824qRQYGgD51ldJTdAVgA",
  authDomain: "progistics-app.firebaseapp.com",
  projectId: "progistics-app",
  storageBucket: "progistics-app.appspot.com",
  messagingSenderId: "707547149273",
  appId: "1:707547149273:web:b25fd6c5f38a936c8cdfc8",
  measurementId: "G-JQ7HQD2359",
  clientId:
    "707547149273-d365i9o81bal8m662k36otf145do6kfg.apps.googleusercontent.com",
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

// var uiConfig = {
//   signInSuccessUrl: "localhost:8080", // Assuming you are running on your local machine
//   signInOptions: [
//     {
//       provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       scopes: config.scopes,
//     },
//   ],
//   // Terms of service url.
//   tosUrl: "/",
// };

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// // The start method will wait until the DOM is loaded.
// ui.start("#firebaseui-auth-container", uiConfig);

// // This function will trigger when there is a login event
// firebase.auth().onAuthStateChanged(function(user) {
//   console.log(user);
//   // Make sure there is a valid user object
//   if (user) {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "https://apis.google.com/js/api.js";
//     // Once the Google API Client is loaded, you can run your code
//     script.onload = function(e) {
//       // Initialize the Google API Client with the config object
//       gapi.client
//         .init({
//           apiKey: config.apiKey,
//           clientId: config.clientID,
//           discoveryDocs: config.discoveryDocs,
//           scope: config.scopes.join(" "),
//         })
//         // Loading is finished, so start the app
//         .then(function() {
//           // Make sure the Google API Client is properly signed in
//           if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
//             startApp(user);
//           } else {
//             firebase.auth().signOut(); // Something went wrong, sign out
//           }
//         });
//     };
//     // Add to the document
//     document.getElementsByTagName("head")[0].appendChild(script);
//   }
// });

// function startApp(user) {
//   console.log(user);

//   // Make sure to refresh the Auth Token in case it expires!
//   firebase
//     .auth()
//     .currentUser.getToken()
//     .then(function() {
//       return gapi.client.calendar.events.list({
//         calendarId: "primary",
//         timeMin: new Date().toISOString(),
//         showDeleted: false,
//         singleEvents: true,
//         maxResults: 10,
//         orderBy: "startTime",
//       });
//     })
//     .then(function(response) {
//       console.log(response);
//     });
// }

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
      console.log(this.$gapi.getUserData().id);
    } else {
      console.log("User already signed-in firebase.");
    }
  });
}

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
