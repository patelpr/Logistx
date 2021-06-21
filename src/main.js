import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import { VueMaskDirective } from "v-mask";
import * as Vue2Leaflet from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { loadGapiInsideDOM } from 'gapi-script';
// const gapi = await loadGapiInsideDOM();

Vue.use(Vue2Leaflet);
Vue.use(L);
Vue.directive("mask", VueMaskDirective);

// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.config.productionTip = false;
const firebaseConfig = {
  apiKey: "AIzaSyA-QWdASbkugX3kJyi0lwDE8KfBb__O3dw",
  authDomain: "logistixapps.firebaseapp.com",
  projectId: "logistixapps",
  storageBucket: "logistixapps.appspot.com",
  messagingSenderId: "149781125117",
  appId: "1:149781125117:web:9fc79ae3747e4cebc76b94",
  measurementId: "G-83WEQPNMNM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// const AUTH_SCOPES = [
//     'email',
//     'profile',
//     'https://www.googleapis.com/auth/analytics.readonly',
//   ]

//   // ....apps.googleusercontent.com
//   const CLIENT_ID =
//     "149781125117-3j9d8k0a1re8qgbblu671iujilrqror0.apps.googleusercontent.com";

//   function handleIsSignedIn(isSignedIn) {
//     if (isSignedIn) {

//       const auth2 = gapi.auth2.getAuthInstance()
//       const currentUser = auth2.currentUser.get()
//       const profile = currentUser.getBasicProfile()
//       console.log('gapi: user signed in!', {
//         name: profile.getName(),
//         imageURL: profile.getImageUrl(),
//         email: profile.getEmail(),
//       })
//       const authResponse = currentUser.getAuthResponse(true)
//       const credential = firebase.auth.GoogleAuthProvider.credential(
//         authResponse.id_token,
//         authResponse.access_token
//       )
//       fb.auth().signInWithCredential(credential)
//         .then(({ user }) => {
//           console.log('firebase: user signed in!', {
//             displayName: user.displayName,
//             email: user.email,
//             photoURL: user.photoURL,
//           })
//         })

//       // Try to make a request to Google Analytics!
//       gapi.client.analytics.management.accounts.list()
//         .then((response) => {
//           console.log('Google Analytics request successful!')
//           if (response.result.items && response.result.items.length) {
//             const accountNames = response.result.items.map(account => account.name)
//             alert('Google Analytics account names: ' + accountNames.join(' '))
//           }
//         })
//     } else {
//       console.log('gapi: user is not signed in')
//     }
//   }

//   new Promise((resolve, reject) => {
//     gapi.load('client:auth2', () => {
//       resolve()
//     })
//   })
//   .then(() => { console.log('gapi: client:auth2 loaded', gapi.client) })
//   .then(() => {
//     return gapi.client.init({
//       apiKey: firebaseConfig.apiKey,
//       clientId: CLIENT_ID,
//       scope: AUTH_SCOPES.join(" "),
//     });
//   })
//   .then(() => {
//     const auth2 = gapi.auth2.getAuthInstance()
//     auth2.isSignedIn.listen(handleIsSignedIn)
//     handleIsSignedIn(auth2.isSignedIn.get())
//     document.querySelector('#sign_in')
//       .addEventListener('click', function handleSignIn() {
//         const auth2 = gapi.auth2.getAuthInstance()
//         if (auth2.isSignedIn.get()) {
//           alert('already signed in')
//           return
//         }

//         auth2.signIn()
//           .catch(error => { alert(`sign in error: ${error}`) })
//       })
//     document.querySelector('#sign_out')
//       .addEventListener('click', function handleSignOut() {
//         console.log('signing out...')
//         const auth2 = gapi.auth2.getAuthInstance()
//         if (!auth2.isSignedIn.get()) {
//           alert('Not signed in!')
//           return
//         }

//         auth2.signOut()
//           .then(() => { console.log('gapi: sign out complete') })
//           .then(() => { return fb.auth().signOut() })
//           .then(() => { console.log('firebase: sign out complete') })

//       })
//   })

new Vue({
  vuetify,
  Vue2Leaflet,
  L,
  router,
  render: (h) => h(App),
}).$mount("#app");
