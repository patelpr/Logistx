<template>
  <v-stepper v-model="l1"  :key="reRender" class="ma-2">
    <v-stepper-header>
      <v-stepper-step color="teal" :complete="l1 > 1" step="1" editable>
        Origin
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step color="teal" :complete="l1 > 2" step="2" editable>
        Destination
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step  color="teal" step="3" editable> Load Details </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5 pa-5" elevation="0">
          <!-- Multi-stop
        v-for="(origin, i) in load.origin"
          :key="i" -->
          <v-row class="mb-4">
            <div class="text-h6">Pick Up Information</div>
            <!-- Multi-stop 
            <v-btn icon color="red" @click="load.origin.splice(i, 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn> -->
          </v-row>
          <v-row>
            <AutoComplete
              v-on:place="
                (e) => {
                  load.origin.location = e;
                }
              "
            />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    load.origin.date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    load.origin.time = x;
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
        <v-row>
          <!-- 
              Multi-stop
              <v-btn text icon color="teal" @click="addOrigins" width="100%">
            <v-icon>mdi-plus</v-icon>Add More Locations
          </v-btn> -->
        </v-row>

        <v-btn color="teal" @click="l1 = 2" :disabled="load.origin.location"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5 pa-5" elevation="0">
          <!--
            Multi-stop 
             v-for="(destination, i) in load.destination"
          :key="i" -->
          <v-row class="mb-4">
            <div class="text-h6">Delivery Information</div>
            <!-- Multi-stop  <v-btn icon color="red" @click="load.destination.splice(i, 1)">
              <v-icon>mdi-delete</v-icon>
            </v-btn> -->
          </v-row>
          <v-row>
            <AutoComplete
              v-on:place="
                (e) => {
                  load.destination.location = e;
                }
              "
            />
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <Date
                v-on:setdate="
                  (x) => {
                    load.destination.date = x;
                  }
                "
              />
            </v-col>
            <v-col cols="12" md="6">
              <Time
                v-on:settime="
                  (x) => {
                    load.destination.time = x;
                  }
                "
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              name="PickupRef"
              label="Pick Up Reference"
              v-model="load.destination.ref"
              prepend-icon="mdi-pound"
              single-line
            ></v-text-field
          ></v-row>
        </v-card>
        <v-row>
          <!-- <v-btn
            text
            icon
            color="teal"
            @click="addDestinations"
            width="100%"
          >
            <v-icon>mdi-plus</v-icon>Add More Locations
          </v-btn> -->
        </v-row>
        <v-btn color="teal" @click="saveRoute()" :disabled="load.destination.location"> Continue </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5 pa-5" elevation="0">
          <v-row class="mb-4">
            <h3>Additional Load Details</h3>
          </v-row>
          <v-row
            ><AddSelectDriver v-on:setdriver="(e) => (load.driver = e)"
          /></v-row>
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

        <v-btn color="teal" @click="loadSubmit()" :disabled="load.origin.location && load.destination.location"> Book Load </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import Address from "../Global/Address.vue";
import AutoComplete from "../Global/AutoComplete.vue";
import Date from "../Global/Date.vue";
import Time from "../Global/Time.vue";
import AddSelectDriver from "../Global/AddSelectDriver.vue";
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
        weight: null,
        rate: null,
        tracking: false,
        active: true,
        equipment: {},
        driver: "",
        route: {},
        contact: {
          name: "",
          email: "",
          number: null,
        },
        origin:
          // [
          {
            location: {},
            date: null,
            time: null,
            ref: "",
          },
        // ],

        destination:
          // [
          {
            location: {},
            time: null,
            date: null,
            ref: "",
          },
        // ],
      },
    };
  },

  components: {
    Address,
    AutoComplete,
    Date,
    AddSelectDriver,
    Time,
  },
  methods: {
    async saveRoute() {
      
      let coords = [
        [this.load.origin.location.lng, this.load.origin.location.lat],
        [
          this.load.destination.location.lng,
          this.load.destination.location.lat,
        ],
      ];
      //   this.load.origin.map(
      //     (x) => (
      //   );
      //   this.load.destination.map(
      //     (x) => (
      //   );
      

      try {
        await axios({
          method: "post",
          headers: {
            Authorization:
              "5b3ce3597851110001cf624841462741459b4d1d93962280efd335b8",
          },
          url: `https://api.openrouteservice.org/v2/directions/driving-hgv/geojson`,
          data: {
            coordinates: coords,
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
            instructions: true,
            instructions_format: "text",
            preference: "recommended",
            roundabout_exits: false,
            suppress_warnings: true,
            units: "mi",
            geometry: true,
          },
        }).then((res) => {
          let resData = res.data.features[0];

          res.data.features[0].geometry.coordinates = H.encode({
            polyline: res.data.features[0].geometry.coordinates,
          });
          resData.summary = resData.properties.summary;
          delete resData.properties;
          delete resData.type;
          this.load.route = resData;
        });
      } catch (error) {
        console.error(error);
      } finally {
        this.l1++;
      }
    },

    // addOrigins() {
    //   this.load.origin.push({ location: {}, date: null, time: null, ref: "" });
    // },
    // addDestinations() {
    //   this.load.destination.push({
    //     location: {},
    //     date: null,
    //     time: null,
    //     ref: "",
    //   });
    // },
    loadSubmit() {
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc();
        this.load.id = docRef.id;
        docRef.set(JSON.parse(JSON.stringify(this.load)));
      } catch (error) {
        console.error(error);
      } finally {
        this.reRender++;
        this.$router.push("/loads");
      }
    },
  },
};
</script>