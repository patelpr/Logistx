import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import { VueMaskDirective } from "v-mask";
import * as Vue2Leaflet from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
const AUTH_SCOPES = [
  'email',
  'profile',
  'https://www.googleapis.com/auth/analytics',
]
Vue.config.productionTip = false;
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA-QWdASbkugX3kJyi0lwDE8KfBb__O3dw",
  authDomain: "logistixapps.firebaseapp.com",
  projectId: "logistixapps",
  storageBucket: "logistixapps.appspot.com",
  messagingSenderId: "149781125117",
  appId: "1:149781125117:web:9fc79ae3747e4cebc76b94",
  measurementId: "G-83WEQPNMNM",
};
const CLIENT_ID = '643107230240-kmp029ie4ifh3vi9fkkahob36ov0kf9r.apps.googleusercontent.com'

// Initialize Firebase
const fb = firebase.initializeApp(FIREBASE_CONFIG)
// export const db = fb.firestore().collection('users').doc(fb.auth().currentUser.uid)


export function handleIsSignedIn(isSignedIn) {
  if (isSignedIn) {

    const auth2 = gapi.auth2.getAuthInstance()
    const currentUser = auth2.currentUser.get()
    const profile = currentUser.getBasicProfile()

    console.log('gapi: user signed in!', {
      name: profile.getName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail(),
    })
    const authResponse = currentUser.getAuthResponse(true)
    const credential = firebase.auth.GoogleAuthProvider.credential(
      authResponse.id_token,
      authResponse.access_token
    )
    fb.auth().signInWithCredential(credential)
      .then(({ user }) => {
        console.log('firebase: user signed in!', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      })

    // Try to make a request to Google Analytics!
    // gapi.client.analytics.management.accounts.list()
    //   .then((response) => {
    //     console.log('Google Analytics request successful!')
    //     if (response.result.items && response.result.items.length) {
    //       const accountNames = response.result.items.map(account => account.name)
    //       alert('Google Analytics account names: ' + accountNames.join(' '))
    //     }
    //   })
  } else {
    console.log('gapi: user is not signed in')
  }
}

new Promise((resolve, reject) => {
  gapi.load('client:auth2', () => {
    resolve()
  })
})
  .then(() => { console.log('gapi: client:auth2 loaded', gapi.client) })
  .then(() => {
    return gapi.client.init({
      apiKey: FIREBASE_CONFIG.apiKey,
      clientId: CLIENT_ID,
      scope: AUTH_SCOPES.join(' '),
    })
  })
  // .then(() => { console.log('gapi: client initialized') })
  // .then(() => { return gapi.client.load('analytics', 'v3') })
  // .then(() => { console.log('gapi: analytics v3 loaded', gapi.client.analytics) })
  .then(() => {
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.isSignedIn.listen(handleIsSignedIn)
    handleIsSignedIn(auth2.isSignedIn.get())


  })


new Vue({
  vuetify,
  Vue2Leaflet,
  L,
  router,
  render: (h) => h(App),
}).$mount("#app");
