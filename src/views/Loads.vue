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
            <AutoComplete v-model="origin" />
          </v-col>

          <v-col cols="12" md="6">
            <AutoComplete v-model="destination" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <HereMap
      ref="map"
      appId="exniu9DfzeFxJRj681P2"
      appCode="lR-J6kbXQXttp16dXgOreueVEkmw5bG0rHYtDVRimZE"
      lat="37.7397"
      lng="-121.4252"
      width="60"
      height="530px"
    />
  </v-container>
</template>

<script>
import HereMap from "../components/HereMap";
import AddLoads from "../components/AddLoads";
import AutoComplete from "../components/AutoComplete";

export default {
  components: {
    HereMap,
    AddLoads,
    AutoComplete,
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
      let selref = this.$refs[ref];
      console.log("ref " + selref);
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
