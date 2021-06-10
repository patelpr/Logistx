<template
  ><div>
    <v-form>
      <v-row align="center" justify="center" no-gutters pa-2>
        <v-col cols="12" md="4">
          <Autocomplete @changed="setOrigin()" />
        </v-col>

        <v-col cols="12" md="4">
          <Date @setdate="setPUDate()" />
        </v-col>
        <v-col cols="12" md="4"> </v-col>
      </v-row>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" md="4">
          <Autocomplete @changed="setDestination()" />
        </v-col>

        <v-col cols="12" md="4">
          <Date @setdate="setDelDate()" />
        </v-col>
        <v-col cols="12" md="4"> </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import Date from "./Date.vue";
import Autocomplete from "./AutoComplete.vue";
import firebase from "firebase";
export default {
  data() {
    return {
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
  mounted() {
    // const autocompleteorigin = new google.maps.places.Autocomplete(
    //   document.getElementById("origin"),
    //   {
    //     componentRestrictions: { country: ["us"] },
    //     fields: ["address_components", "geometry"],
    //     types: ["address"],
    //   }
    // );
    // const autocompletedestination = new google.maps.places.Autocomplete(
    //   document.getElementById("destination"),
    //   {
    //     componentRestrictions: { country: ["us", "ca"] },
    //     fields: ["address_components", "geometry"],
    //     types: ["address"],
    //   }
    // );
    // autocompleteorigin.addListener("place_changed", () => {
    //   this.load.origin.location = autocompleteorigin.getPlace();
    //   console.log(autocompleteorigin.getPlace());
    // });
    // autocompletedestination.addListener("place_changed", () => {
    //   this.load.destination.location = autocompletedestinations.getPlace();
    //   7;
    //   console.log(autocompletedestinations.getPlace());
    // });
  },
  components: {
    Autocomplete,
    Date,
  },

  created: function() {
    this.$on("some-event", () => {
      console.log("WOW! custom event is triggered");
    });
  },
  methods: {
    setPUDate: function(e) {
      this.load.origin.date = e;
      console.log(this.load.origin.date);
    },
    setDelDate: function(e) {
      this.load.destination.date = e;
    },

    setOrigin: function(e) {
      this.load.origin.location = e;
      console.log(this.load.origin.location);
    },
    setDestination: function(e) {
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

<style></style>
