<template>
  <div id="theMap">
    <v-map
      v-if="load"
      ref="myMap"
      :bounds="[origin, destination]"
      style="height: 100vh"
    >
      <v-tilelayer :url="url" :attribution="attribution"> </v-tilelayer>
      <v-marker :lat-lng="origin"></v-marker>
      <v-marker :lat-lng="destination"></v-marker>
      <l-polyline :latLngs="poly.geometry.coordinates" lineCap lineJoin> </l-polyline>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline,  } from "vue2-leaflet";
// import L from "leaflet";
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
      this.origin = [x.origin.location.latitude, x.origin.location.longitude];
      this.destination = [
        x.destination.location.latitude,
        x.destination.location.longitude,
      ];
    },
    polyline: function(x){
      this.poly = this.decode(x)

      console.log(this.poly)
    }
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
