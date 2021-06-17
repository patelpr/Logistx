<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1">
        Origin
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2">
        Destination
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" @click="e1 = 3"> Details </v-stepper-step>
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
              class="pa-5"
              style="border: 2px solid black"
              classname="search-location"
              placeholder="Start typing Address"
              :country="['us']"
              v-on:placechanged="setOrigin"
              required
              width="100%"
            >
            </vue-google-autocomplete>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <input
                class="pa-3"
                style="border: 2px solid black"
                type="datetime-local"
                id="meeting-time"
                name="pickuptime"
                v-model="load.origin.time"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                :minDate="Date.now()"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="PickupRef"
                label="Pick Up Reference"
                value=""
                v-model="load.origin.ref"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pa-12">
          <v-row>
            <h3>Delivery Information</h3>
          </v-row>
          <v-row>
            <vue-google-autocomplete
              id="destination"
              class="pa-5"
              style="border: 2px solid black"
              classname="search-location"
              placeholder="Start typing Address"
              :country="['us']"
              required
              v-on:placechanged="setDestination"
            >
            </vue-google-autocomplete>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <input
                type="datetime-local"
                class="pa-3"
                style="border: 2px solid black"
                name="delivery-time"
                v-model="load.destination.time"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                :minDate="Date.now()"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="PickupRef"
                label="Pick Up Reference"
                value=""
                v-model="load.destination.ref"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-12 pa-12">
          <v-row>
            <h3>Additional Load Details</h3>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                name="weight"
                label="Weight"
                type="number"
                v-model="load.weight"
                single-line
              >
                <v-icon slot="prepend"> mdi-weight </v-icon>
                <v-icon slot="append"> mdi-weight-pound </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="rate"
                type="number"
                label="Rate"
                v-model="load.rate"
                single-line
              >
                <v-icon slot="prepend"> mdi-currency-usd </v-icon>
                <v-icon slot="append"> mdi-decimal </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="type"
                label="Type"
                v-model="load.type"
                placeholder="Reefer / Van"
                single-line
              >
                <v-icon slot="prepend"> mdi-truck-outline </v-icon>
                <v-icon slot="append"> mdi-truck-trailer </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <h3>Contact Details</h3>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_name"
                label="Contact Name"
                v-model="load.contact.name"
                placeholder="Name"
                single-line
              >
                <v-icon slot="append"> mdi-account </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_number"
                label="Contact Number"
                v-mask="'(###) ###-####'"
                v-model="load.contact.number"
                placeholder="Number"
                single-line
              >
                <v-icon slot="append"> mdi-phone </v-icon></v-text-field
              >
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                name="contact_email"
                label="Contact Email"
                v-model="load.contact.email"
                placeholder="Email"
                :rules="emailRules"
                single-line
              >
                <v-icon slot="append"> mdi-at </v-icon></v-text-field
              >
            </v-col>
          </v-row>
          <v-row>
            <v-checkbox
              v-model="load.tracking"
              label="Tracking Required"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Address :load="load.origin" title="Pickup" />

              <v-btn class="ma-2" @click="e1 = 1">EDIT ORIGIN </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <Address :load="load.destination" title="Delivery" />
              <v-btn class="ma-2" @click="e1 = 2">EDIT DELIVERY</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <!-- <v-file-input
              truncate-length="15"
              chips
              multiple
              v-model="load.ratecon"
              label="Rate Con File Upload"
            ></v-file-input> -->
          </v-row>
        </v-card>

        <v-btn color="primary" @click="saveRoute()"> Book Load </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Address from "../Global/Address.vue";
import axios from "axios";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import firebase from "firebase";
export default {
  data() {
    return {
      e1: 1,
      phoneRules: [
        (v) => !!v || "This field is required",
        (v) => (v && v >= 1000000000) || "10 Digit Phone Number",
        (v) => (v && v <= 9999999999) || "10 Digit Phone Number bad",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      valid: true,
      load: {
        route: {
          summary: null,
          segments: null,
        },
        num: null,
        weight: null,
        driver: {
          name: null,
          number: null,
        },
        rate: null,
        type: null,
        tracking: false,
        active: true,

        contact: {
          name: null,
          email: null,
          number: null,
        },
        origin: {
          location: {},
          time: null,
          ref: "",
        },

        destination: {
          location: {},
          time: null,
          ref: null,
        },
      },
    };
  },

  components: {
    VueGoogleAutocomplete,
    Address,
  },
  methods: {
    assessLocale(place) {
      let address_comp = {};
      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address_comp.streetnumber = component.long_name;
            break;
          }

          case "route": {
            address_comp.street = component.long_name;
            break;
          }

          case "postal_code": {
            address_comp.postcode = component.long_name;
            break;
          }

          case "postal_code_suffix": {
            address_comp.postcode_suffix = component.long_name;
            break;
          }
          case "locality":
            address_comp.city = component.long_name;
            break;

          case "administrative_area_level_1": {
            address_comp.state = component.short_name;
            break;
          }
          case "country":
            address_comp.country = component.long_name;
            break;
        }
      }
      // console.log(address_comp);
      return address_comp;
    },
    flatten(arr) {
      return arr.reduce(
        (acc, cur) => acc.concat(Array.isArray(cur) ? this.flatten(cur) : cur),
        []
      );
    },
    clear() {
      console.log(this.load);
      this.load = {
        weight: null,
        rate: "",
        type: "",
        tracking: false,
        active: true,

        contact: {
          name: "",
          email: "",
          number: "",
        },
        origin: {
          location: {},
          time: "",
          ref: "",
        },

        destination: {
          location: {},
          time: "",
          ref: "",
        },
      };
    },
    async saveRoute() {
      try {
        this.load.origin.location != this.load.destination.location
          ? await axios
              .get(
                `https://api.openrouteservice.org/v2/directions/driving-hgv?api_key=5b3ce3597851110001cf624841462741459b4d1d93962280efd335b8&start=${this.load.origin.location.longitude},${this.load.origin.location.latitude}&end=${this.load.destination.location.longitude},${this.load.destination.location.latitude}`
              )
              .then((res) => {
                console.log(res);
                this.load.route.summary =
                  res.data.features[0].properties.summary;
                let flatArr = this.flatten(
                  res.data.features[0].geometry.coordinates
                );
                this.load.route.geometry = flatArr;

                this.load.createdAt = Date.now();
                this.submit();
              })
          : console.error("Destination and origin must be different");
      } catch (error) {
        console.log(error);
      }
    },

    setOrigin: function (e, p, i) {
      this.load.origin.location.formatted_address = p.formatted_address;
      this.load.origin.location.latitude = e.latitude;
      this.load.origin.location.longitude = e.longitude;
      this.load.origin.location.url = p.url;
      this.load.origin.location.address_components = this.assessLocale(p);
    },
    setDestination: function (e, p, i) {
      this.load.destination.location.formatted_address = p.formatted_address;
      this.load.destination.location.latitude = e.latitude;
      this.load.destination.location.longitude = e.longitude;
      this.load.destination.location.url = p.url;
      this.load.destination.location.address_components = this.assessLocale(p);
    },
    submit() {
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc();
        console.log(docRef.id);
        this.load.id = docRef.id;
        console.log(this.load);
        docRef.set(this.load);
      } catch (error) {
        console.log(error);
      } finally {
        this.clear();
        this.$router.push("/loads");
      }
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
