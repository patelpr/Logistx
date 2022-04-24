import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import { VueMaskDirective } from "v-mask";
import * as Vue2Leaflet from "vue2-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


var firebaseConfig = {
  apiKey: "AIzaSyASOQIUVCneyQLGqN7Nc0AgqkxOsflMcfA",
  authDomain: "progistics-app.firebaseapp.com",
  projectId: "progistics-app",
  storageBucket: "progistics-app.appspot.com",
  messagingSenderId: "707547149273",
  appId: "1:707547149273:web:8b5e1d5d1bc7be398cdfc8",
  measurementId: "G-05HYKRD27Y",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

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
