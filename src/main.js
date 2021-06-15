import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import { VueMaskDirective } from "v-mask";
import * as Vue2Leaflet from "vue2-leaflet";
import L from "leaflet";

Vue.use(Vue2Leaflet);
Vue.use(L);
Vue.directive("mask", VueMaskDirective);

Vue.config.productionTip = false;
var firebaseConfig = {
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
new Vue({
  vuetify,
  Vue2Leaflet,
  L,
  router,
  render: (h) => h(App),
}).$mount("#app");
