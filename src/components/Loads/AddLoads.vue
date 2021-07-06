<template>
  <v-stepper v-model="l1" non-linear :key="reRender" class="ma-2">
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
        <v-card
          class="mb-5 pa-5"
          elevation="0"
          v-for="(origin, i) in load.origin"
          :key="i"
        >
          <v-row class="mb-4">
            <div class="text-h6">Pick Up Information #{{ i + 1 }}</div>
            <v-btn icon color="red" @click="deleteOriginLocation(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <AutoComplete
              v-on:place="
                (e) => {
                  load.origin[i].location = assessLocale(e);
                }
              "
            />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    load.origin[i].date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    load.origin[i].time = x;
                  }
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              name="PickupRef"
              label="Pick Up Reference"
              v-model="load.origin[i].ref"
              prepend-icon="mdi-pound"
              single-line
            ></v-text-field
          ></v-row>
        </v-card>
        <v-row>
          <v-btn text icon color="primary" @click="addOrigins" width="100%">
            <v-icon>mdi-plus</v-icon>Add More Locations
          </v-btn>
        </v-row>

        <v-btn color="primary" @click="l1 = 2"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5 pa-5"
          elevation="0"
          v-for="(destination, i) in load.destination"
          :key="i"
        >
          <v-row class="mb-4">
            <div class="text-h6">Delivery Information #{{ i + 1 }}</div>
            <v-btn icon color="red" @click="deleteDestinationLocation(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-row>
            <AutoComplete
              v-on:place="
                (e) => {
                  load.destination[i].location = assessLocale(e);
                }
              "
            />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    load.destination[i].date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    load.destination[i].time = x;
                  }
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              name="PickupRef"
              label="Pick Up Reference"
              v-model="load.destination[i].ref"
              prepend-icon="mdi-pound"
              single-line
            ></v-text-field
          ></v-row>
        </v-card>
        <v-row>
          <v-btn
            text
            icon
            color="primary"
            @click="addDestinations"
            width="100%"
          >
            <v-icon>mdi-plus</v-icon>Add More Locations
          </v-btn>
        </v-row>
        <v-btn color="primary" @click="saveRoute()"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5 pa-5" elevation="0">
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
              <div v-for="(load, i) in load.origin" :key="i">
                <Address :load="load" title="Pickup" />
              </div>

              <v-btn class="ma-2" @click="l1 = 1">EDIT ORIGIN </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <div v-for="(load, i) in load.destination" :key="i">
                <Address :load="load" title="Delivery" />
              </div>
              <v-btn class="ma-2" @click="l1 = 2">EDIT DELIVERY</v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-btn color="primary" @click="loadSubmit()"> Book Load </v-btn>
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
        rate: null,
        tracking: false,
        active: true,
        equipment: {},
        route: {},
        contact: {
          name: "",
          email: "",
          number: null,
        },
        origin: [
          {
            location: {},
            date: null,
            time: null,
            ref: "",
          },
        ],

        destination: [
          {
            location: {},
            time: null,
            date: null,
            ref: "",
          },
        ],
      },
    };
  },

  components: {
    // Address,
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
      console.log("load origin", this.load.origin);
      console.log("load destination", this.load.destination);

      place.address_components = address_comp;
      return place;
    },
    async saveRoute() {
      console.log(this.load);
      let coords = [];
      this.load.origin.map((x) => coords.push([x.lng, x.lat]));
      this.load.destination.map((x) => coords.push([x.lng, x.lat]));

      try {
        this.load.origin.location[0].lat &&
        this.load.destination.location[0].lat
          ? await axios
              .post(
                `https://api.openrouteservice.org/v2/directions/driving-hgv/geojson`,
                {
                  coordinates: coords,
                  continue_straight: "true",
                  extra_info: [
                    "suitability",
                    "steepness",
                    "surface",
                    "waycategory",
                    "waytype",
                    "tollways",
                    "traildifficulty",
                    "osmid",
                    "roadaccessrestrictions",
                    "countryinfo",
                    "green",
                    "noise",
                  ],
                  instructions: "true",
                  instructions_format: "text",
                  options: { vehicle_type: "hgv" },
                  preference: "recommended",
                  roundabout_exits: "false",
                  suppress_warnings: "true",
                  units: "mi",
                  geometry: "true",
                }
              )
              .then((res) => {
                console.log(res);
                res.data.features[0].geometry.coordinates = H.encode({
                  polyline: res.data.features[0].geometry.coordinates,
                });
                console.log(res);
                this.load.route = res.data.features[0];

                this.load.createdAt = Date.now();
              })
          : console.error("Destination and origin must be different");
      } catch (error) {
        console.log(error);
      } finally {
        this.l1++;
        this.loadSubmit();
      }
    },

    addOrigins() {
      this.load.origin.push({ location: {}, date: null, time: null, ref: "" });
    },
    addDestinations() {
      this.load.destination.push({
        location: {},
        date: null,
        time: null,
        ref: "",
      });
    },
    deleteOriginLocation(i) {
      this.load.origin.splice(i, 1);
    },
    deleteDestinationLocation(i) {
      this.load.destination.splice(i, 1);
    },
    loadSubmit() {
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc();
        this.load.id = docRef.id;
        docRef.set(this.load);
      } catch (error) {
        console.log(error);
      } finally {
        this.reRender++;
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
  font-size: 20px;
  width: 100%;
  font-weight: 400;
  outline: blue;
  height: 30px;
  line-height: 30px;
  border: darkslategrey 2px;
}
</style>
