<template>
  <div id="map">
    <v-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      style="height: 100vh; width:100vw; position:absolute; left:54px;top:0px;"
    >
      <v-tilelayer :url="url" :attribution="attribution"> Hell o</v-tilelayer>
    </v-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";
// const osrRouter = L.Routing.openrouteservice(
//   "5b3ce3597851110001cf624841462741459b4d1d93962280efd335b8",
//   {
//     timeout: 30 * 1000, // 30",
//     format: "json", // default, gpx not yet supported
//     host: "https://api.openrouteservice.org", // default if not setting
//     service: "directions", // default (for routing)
//     api_version: "v2", // default
//     profile: "driving-hgv", // default
//     routingQueryParams: {
//       attributes: ["avgspeed", "percentage"],
//       language: "en-us",
//       maneuvers: "true",
//       preference: "recommended",
//     },
//   }
// );

export default {
  name: "map",
  components: {
    "v-map": LMap,
    "v-tilelayer": LTileLayer,
    // "v-marker": LMarker,
  },
  methods: {
    doSomethingOnReady() {
      L.Routing.control({
        router: osrRouter,
        formatter: L.routing.formatterORS({
          language: "en", // language of instructions & control ui
          steptotext: true, // force using internal formatter instead of ORS instructions
        }),
      }).addTo(this.$refs.myMap.mapObject);
    },
  },
  data() {
    return {
      zoom: 13,
      center: [47.41322, -1.219482],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap || </a> contributors',

      markers: [
        {
          id: 1,
          latlng: L.latLng(47.41722, -1.222482),
          content: "Hi! this is my popup data",
        },
        {
          id: 2,
          latlng: L.latLng(47.41722, -1.25),
          content: "Another",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
#map{
    overflow: hidden;
    scrollbar-width: 1px;
}
</style>
