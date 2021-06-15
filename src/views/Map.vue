<template>
  <div id="map">
    <v-map
      ref="myMap"
      :zoom="zoom"
      :bounds="bounds"
      :center="center"

      style="
        height: 100vh;
        width: 100vw;
        position: absolute;
        left: 54px;
        top: 0px;
        z-index: 0;
      "
    >
      <v-tilelayer :url="url" :attribution="attribution"> </v-tilelayer>
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

    centerDefault() {
      return this.center || [32.8323435, -97.1628612];
    },
    // doSomethingOnReady() {
    //   L.Routing.control({
    //     router: osrRouter,
    //     formatter: L.routing.formatterORS({
    //       language: "en", // language of instructions & control ui
    //       steptotext: true, // force using internal formatter instead of ORS instructions
    //     }),
    //   }).addTo(this.$refs.myMap.mapObject);
    // },
  },
  props: {
    center: { type: Array },
    origin: { type: Array },
    destination: { type: Array },
  },
  data() {
    return {
      zoom: 12,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap || </a> contributors',
        bounds :new L.LatLngBounds(this.origin, this.destination),
        
      markers: [
        {
          id: 1,
          latlng: L.latLng(this.origin),
          content: "Hi! this is my popup data",
        },
        {
          id: 2,
          latlng: L.latLng(this.destination),
          content: "Another",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "~leaflet/dist/leaflet.css";
#map {
  overflow: hidden;
  scrollbar-width: 1px;
}
</style>
