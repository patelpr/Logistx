<template
  ><div>
    <v-row justify="center">
      <v-col cols="12">
        <v-toolbar dark color="primary">
          <v-spacer></v-spacer>
          <v-toolbar-title>Add Loads</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit()">
              Submit
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-form v-model="valid" lazy-validation>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" md="4">
          <input
            id="origin"
            type="text"
            label="origin"
            required
            style="font-size:1.2em"
            v-model="load.origin.address"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="load.origin.date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="load.origin.date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4"> </v-col>
      </v-row>
      <v-row align="center" justify="center" no-gutters>
        <v-col cols="12" md="4">
          <input
            id="destination"
            type="text"
            label="destination"
            style="font-size:1.2em"
            required
            v-model="load.destination.address"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="load.origin.date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="load.destination.date"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="4"> </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      menu: false,
      menu1: false,
      valid: true,
      dialog: false,
      load: {
        num: null,
        driver: "",
        rate: null,
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
    const autocompleteorigin = new google.maps.places.Autocomplete(
      document.getElementById("origin")
    );
    const autocompletedestination = new google.maps.places.Autocomplete(
      document.getElementById("destination")
    );
    autocompleteorigin.addListener("place_changed", () => {
      this.load.origin.location = autocompleteorigin.getPlace();
      console.log(autocompleteorigin.getPlace());
    });
    autocompletedestination.addListener("place_changed", () => {
      this.load.destination.location = autocompletedestinations.getPlace();
      7;
      console.log(autocompletedestinations.getPlace());
    });
  },

  methods: {
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
