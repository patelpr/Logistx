<template>
  <div id="theMap">
    <v-map
      ref="myMap"
      v-if="origin && destination && load"
      :bounds="[
        [load.origin[0].location.lat, load.origin[0].location.lng],
        [load.destination[0].location.lat, load.destination[0].location.lng],
      ]||[[38.6185221,-92.7914713],[33.889239,-84.226134]]"
      style="height: 100vh; z-index: 0"
    >
      <v-tilelayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      >
      </v-tilelayer>
      <v-marker :lat-lng="origin"></v-marker>
      <v-marker :lat-lng="destination"></v-marker>

      <l-polyline :lat-lngs="poly.geometry.coordinates" lineCap lineJoin>
      </l-polyline>
    </v-map>
    <v-map
      ref="myMap"
      v-else
      :bounds="[[47.6185221,-100.7914713],[30.889239,-97.526134]]"
      style="height: 100vh; z-index: 0"
    >
      <v-tilelayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        :attribution="attribution"
      >
      </v-tilelayer>
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
    "l-polyline": LPolyline,
  },
  props: {
    load: { type: Object },
  },
  watch: {
    load: function (x) {
      this.origin = [x.origin[0].location.lat, x.origin[0].location.lng];
      this.destination = [
        x.destination[0].location.lat,
        x.destination[0].location.lng,
      ];
      console.log(this.origin,this.destination)
      this.poly = this.decode(x.route.geometry.coordinates);
      this.selectedLoad = x;
    },
  },
  mounted() {
    this.selectedLoad = this.load;
    this.load = this.selectedLoad;
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
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    };
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
</style>
