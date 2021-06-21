<template>
  <div id="theMap">
    <v-row v-if="!selectedLoad" justify="space-around" class="ma-4">
      <h1>Select A Load To View the Map</h1>
    </v-row>

    <v-map
      ref="myMap"
      v-else
      :bounds="[
        [
          selectedLoad.origin.location.latitude,
          selectedLoad.origin.location.longitude,
        ],
        [
          selectedLoad.destination.location.latitude,
          selectedLoad.destination.location.longitude,
        ],
      ]"
      style="height: 100vh"
    >
      <v-tilelayer :url="url" :attribution="attribution"> </v-tilelayer>
      <v-marker :lat-lng="origin"></v-marker>
      <v-marker :lat-lng="destination"></v-marker>

      <l-polyline :latLngs="poly.geometry.coordinates" lineCap lineJoin>
      </l-polyline>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline } from "vue2-leaflet";
import H from "../assets/fastpolylines";
export default {
  name: "map",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    "v-marker": LMarker,
    LPolyline,
  },
  props: {
    load: { type: Object },
    drivers: { type: Array },
  },
  watch: {
    load: function(x) {
      this.selectedLoad = x;
      this.origin = [
        this.selectedLoad.origin.location.latitude,
        this.selectedLoad.origin.location.longitude,
      ];
      this.destination = [
        this.selectedLoad.destination.location.latitude,
        this.selectedLoad.destination.location.longitude,
      ];
      this.poly = this.decode(this.selectedLoad.route.geometry);
    },
  },
  mounted() {
    this.selectedLoad = this.load;
  },
  methods: {
    decode(str) {
      let lines = H.decode(str);
      return {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: lines.polyline,
        },
      };
    },
  },

  data() {
    return {
      selectedLoad: null,
      poly: null,
      origin: null,
      destination: null,

      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    };
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
</style>
