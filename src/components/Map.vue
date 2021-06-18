<template>
  <div id="theMap">
    <v-map
      ref="myMap"
      :bounds="[origin, destination]"
      style="height: 100vh"
      v-if="selectedLoad"
      @ready="setdata()"
    >
      <v-tilelayer :url="url" :attribution="attribution"> </v-tilelayer>
      <v-marker :lat-lng="origin"></v-marker>
      <v-marker :lat-lng="destination"></v-marker>
      <l-polyline :latLngs="poly.geometry.coordinates" lineCap lineJoin>
      </l-polyline>
    </v-map>
    <v-row v-else justify="space-around" class="ma-4">
      <h1>Select A Load To View the Map</h1>
    </v-row>
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
    polyline: { type: String },
  },
  watch: {
    load: function (x) {
      this.selectedLoad = x;
      this.origin = [
        this.selectedLoad.origin.location.latitude,
        this.selectedLoad.origin.location.longitude,
      ];
      this.destination = [
        this.selectedLoad.destination.location.latitude,
        this.selectedLoad.destination.location.longitude,
      ];
      this.poly = this.decode(x.route.geometry);
    },
  },
  methods: {
    setdata() {
      this.selectedLoad = this.load;
    },
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
      origin: [32.8323435, -97.1628612],
      destination: [31.8323435, -96.1628612],
      poly: [this.origin, this.destination],

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
