<template>
  <div style="height: 200px; overflow: auto;">
    <l-map></l-map>
    <l-tile-layer></l-tile-layer>
    <l-marker></l-marker>
    <l-popup></l-popup>
    <l-tooltip></l-tooltip>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";

import firebase from "firebase";
export default {
  data() {
    return {
      loads: [],
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    };
  },
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-popup": LPopup,
    "l-tooltip": LTooltip,
  },
  created() {
    this.getLoads();
    console.log(this.loads);
  },

  methods: {
    async getLoads() {
      this.loads = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("loads")
        .where("active", "==", true)
        .onSnapshot((querySnapshot) => {
          var loads = [];
          querySnapshot.forEach((doc) => {
            loads.push(doc.data());
            this.loads = loads;
            // console.log(loads);
          });
        });
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
  },
};
</script>

<style></style>
