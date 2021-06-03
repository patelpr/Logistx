<template>
  <v-container>
    <AddLoads />

    <!-- <div style="padding: 10px 0">
      <div>
        <label style="display: inline-block; width: 60px; color: #FFF"
          >Start</label
        >
        <input type="text" v-model="start" />
      </div>
      <div>
        <label style="display: inline-block; width: 60px; color: #FFF"
          >Finish</label
        >
        <input type="text" v-model="finish" />
      </div>
      <button type="button" @click="route()">Route</button>
    </div> -->
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <input
              v-model="origin"
              type="text"
              placeholder="Origin"
              ref="autcompleteOrigin"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <input
              v-model="destination"
              type="text"
              placeholder="Destination"
              ref="autcompleteDestination"
              required
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <HereMap
      ref="map"
      appId="rhBFhiRCho4SLkdJh1Sr"
      appCode="WY6Fsbx49TNgC2xnpNi_Ahk_N4lt81INOkwaL5ayN5U"
      :center="center"
      width="100%"
      height="100%"
    />
  </v-container>
</template>

<script>
import HereMap from "../components/HereMap";
import AddLoads from "../components/AddLoads";

export default {
  components: {
    HereMap,
    AddLoads,
  },
  data() {
    return {
      dialog: false,
      origin: "",
      destination: "",
      center: {
        lat: "",
        lng: "",
      },
    };
  },
  methods: {
    route() {
      this.$refs.map.route(this.origin, this.destination);
    },
  },
  mounted() {
    for (let ref in this.$refs) {
      let selref= this.$refs[ref]
      console.log("ref " + selref]);
      const autocomplete = new google.maps.places.Autocomplete(this.$refs[ref]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        console.log(place);
      });
    }
  },
};
</script>
<style scoped>
input {
  font-size: 1.6em;
}
</style>
