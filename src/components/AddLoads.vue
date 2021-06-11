<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Origin
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Destination
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Notes
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12 pa-12">
          <v-row>
            <h3>Pick Up Information</h3>
          </v-row>
          <v-row>
            <vue-google-autocomplete
              id="origin"
              classname="search-location"
              placeholder="Start typing Address"
              :country="['us']"
              type="(establishment)"
              enable-geolocation
              v-on:placechanged="setOrigin"
              width="100%"
            >
            </vue-google-autocomplete>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date v-on:setdate="setPUDate()" />
            </v-col>
            <v-col cols="12" md="6">
              <Time v-on:settime="setPUTime()" />
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1 = 2">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pa-12">
          <v-row>
            <h3>Pick Up Information</h3>
          </v-row>
          <v-row>
            <vue-google-autocomplete
              id="destination"
              classname="search-location"
              placeholder="Start typing Address"
              :country="['us']"
              type="establishment"
              v-on:placechanged="setDestination"
            >
            </vue-google-autocomplete>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date v-on:setdate="setDelDate()" />
            </v-col>
            <v-col cols="12" md="6">
              <Time v-on:settime="setDelTime()" />
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1 = 3">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 pa-12"> </v-card>

        <v-btn color="primary" @click="submit()">
          Continue
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Date from "./Date.vue";
import Time from "./Time.vue";

import VueGoogleAutocomplete from "vue-google-autocomplete";
import firebase from "firebase";
export default {
  data() {
    return {
      e1: 1,
      valid: true,
      load: {
        num: null,
        driver: "",
        rate: null,
        ratecon: null,
        type: null,
        tracking: null,

        contact: {
          name: null,
          email: null,
          number: null,
        },
        origin: [
          {
            location: null,
            address: null,
            date: null,
            time: null,
            lumper: null,
            detention: null,
            layover: null,
            ref: null,
            notes: "",
            bolnum: null,
            sealnum: null,
          },
        ],
        destination: [
          {
            location: null,
            address: null,
            date: null,
            time: null,
            lumper: null,
            detention: null,
            layover: null,
            ref: null,
            notes: "",
            pod: null,
          },
        ],
      },
    };
  },

  components: {
    VueGoogleAutocomplete,
    Date,
    Time,
  },
  methods: {
    setPUDate: function(e) {
      this.load.origin.date = e;
      console.log(this.load.origin.date);
    },
    setDelDate: function(e) {
      this.load.destination.date = e;
    },
    setPUTime: function(e) {
      this.load.origin.time = e;
      console.log(this.load.origin.time);
    },
    setDelTime: function(e) {
      this.load.destination.time = e;
    },

    setOrigin: function(e, p, i) {
      this.load.origin.location = e;
      console.log(this.load.origin.location);
    },
    setDestination: function(e, p, i) {
      this.load.destination.location = e;
      console.log(this.load.destination.location);
    },
    submit() {
      firebase
        .firestore()
        .collection("Users")
        .doc(firebase.auth().currentUser)
        .collection("Loads")
        .doc()
        .add(this.load);
    },
  },
};
</script>

<style scoped>
.search-location {
  padding: 12px 20px;
  margin: 12px;
  display: block;
  width: 60vw;
  font-size: 20px;
  font-weight: 400;
  outline: blue;
  height: 30px;
  line-height: 30px;
}
</style>
