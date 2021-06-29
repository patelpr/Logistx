<template>
  <v-stepper v-model="l1" non-linear :key="reRender">
    <v-stepper-header>
      <v-stepper-step :complete="l1 > 1" step="1" editable>
        Origin
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="l1 > 2" step="2" editable>
        Destination
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" editable> Load Details </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5 pa-10" elevation="0">
          <v-row class="mb-4">
            <h3>Pick Up Information</h3>
          </v-row>
          <v-row>
            <AutoComplete v-on:place="setOrigin" />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    this.load.origin.date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    this.load.origin.time = x;
                  }
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              name="PickupRef"
              label="Pick Up Reference"
              v-model="load.origin.ref"
              prepend-icon="mdi-pound"
              single-line
            ></v-text-field
          ></v-row>
        </v-card>

        <v-btn color="primary" @click="l1 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5 pa-10" elevation="0">
          <v-row class="mb-4">
            <h3>Delivery Information</h3>
          </v-row>
          <v-row>
            <AutoComplete v-on:place="setDestination" />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    this.load.destination.date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    this.load.destination.time = x;
                  }
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              name="DeliverRef"
              prepend-icon="mdi-pound"
              label="Delivery Reference"
              v-model="load.destination.ref"
              single-line
            ></v-text-field>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="l1 = 3"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5 pa-10" elevation="0">
          <v-row class="mb-4">
            <h3>Additional Load Details</h3>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                name="weight"
                label="Weight"
                v-mask="'######'"
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
                v-mask="'######'"
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

              <v-btn class="ma-2" @click="l1 = 1">EDIT ORIGIN </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <Address :load="load.destination" title="Delivery" />
              <v-btn class="ma-2" @click="l1 = 2">EDIT DELIVERY</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="saveRoute()"> Book Load </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Address from "../Global/Address.vue";
import AutoComplete from "../Global/AutoComplete.vue";
import Date from "../Global/Date.vue";
import Time from "../Global/Time.vue";

import axios from "axios";
import firebase from "firebase";
import H from "../../assets/fastpolylines";
export default {
  data() {
    return {
      l1: 1,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      valid: true,
      reRender: 0,

      load: {
        num: null,
        weight: null,
        route: {
          summary: {},
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
          ref: "",
        },
      },
    };
  },

  components: {
    Address,
    AutoComplete,
    Date,
    Time,
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
      console.log(address_comp);

      return address_comp;
    },
    clear() {
      this.reRender++;
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
                console.log(res.data.features[0].geometry.coordinates);
                this.load.route.geometry = H.encode({
                  polyline: res.data.features[0].geometry.coordinates,
                });
                this.load.createdAt = Date.now();
                this.loadSubmit();
              })
          : console.error("Destination and origin must be different");
      } catch (error) {
        console.log(error);
      }
    },

    setOrigin: function(e) {
      console.log(e);
      this.load.origin.location = e;
      this.load.origin.location.address_components = this.assessLocale(e);
    },
    setDestination: function(e, p, i) {
      this.load.destination.location = e;
      this.load.destination.location.address_components = this.assessLocale(p);
    },
    loadSubmit() {
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments")
          .doc();
        this.load.id = docRef.id;
        docRef.set(this.load);
      } catch (error) {
        console.log(error);
      } finally {
        this.clear();
        this.$router.push("/loads");
      }
    },
  },
  mounted() {
    // for (let ref in this.$refs) {
    //   const autocomplete = new google.maps.places.Autocomplete(this.$refs[ref]);
    //   autocomplete.addListener("place_changed", () => {
    //     const place = autocomplete.getPlace();
    //     console.log(place);
    //   });
    // }
  },
};
</script>

<style scoped>
.search-location {
  padding: 12px 20px;
  margin: 12px;
  display: block;
  font-size: 20px;
  width: 100%;
  font-weight: 400;
  outline: blue;
  height: 30px;
  line-height: 30px;
  border: darkslategrey 2px;
}
</style>
