<template>
  <v-stepper v-model="e1" non-linear>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-stepper-header>
        <v-stepper-step editable step="1"> Driver Details </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2"> License Details </v-stepper-step>
        <!-- 
        <v-divider></v-divider>

        <v-stepper-step editable step="3">
          Employment History
        </v-stepper-step> -->
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12 pa-12">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  name="driver_firstname"
                  label="Driver First Name"
                  v-model="driver.fName"
                  placeholder="First Name"
                  :rules="form.nameRules"
                  single-line
                  required
                  ><v-icon slot="prepend"> mdi-account </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  name="driver_lastname"
                  label="Driver Last Name"
                  v-model="driver.lName"
                  placeholder="Last Name"
                  :rules="form.nameRules"
                  single-line
                  required
                  ><v-icon slot="prepend"> mdi-account </v-icon></v-text-field
                >
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Date of Birth"
                  name="dob"
                  v-mask="'##/##/####'"
                  messages="mm/dd/yyyy"
                  v-model="driver.dob"
                  required
                >
                  <v-icon slot="prepend"> mdi-cake </v-icon>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  name="driver_email"
                  label="Driver Email"
                  v-model="driver.email"
                  placeholder="Email"
                  :rules="form.emailRules"
                  single-line
                  required
                  ><v-icon slot="prepend"> mdi-at </v-icon></v-text-field
                ></v-col
              >
              <v-col cols="12" md="4">
                <v-text-field
                  name="driver_number"
                  label="Driver Phone Number"
                  v-model="driver.phone"
                  placeholder="Phone Number"
                  v-mask="'(###) ###-####'"
                  single-line
                  required
                >
                  <v-icon slot="prepend"> mdi-phone </v-icon>
                </v-text-field></v-col
              ><v-col cols="12" md="4">
                <v-text-field
                  name="driver_ssn"
                  label="Driver SSN"
                  v-model="driver.ssn"
                  v-mask="'###-##-####'"
                  placeholder="Social Security Number"
                  single-line
                  required
                >
                  <v-icon slot="prepend">
                    mdi-card-account-details
                  </v-icon></v-text-field
                ></v-col
              >
            </v-row>
            <v-row>
              <v-col cols="12" md="1">
                <v-icon>mdi-map-marker</v-icon>
              </v-col>
              <v-col cols="12" md="11">
                <!-- <vue-google-autocomplete
                  id="employeeaddress"
                  class="pa-5"
                  style="border: 1px solid gray"
                  placeholder="Driver Address"
                  classname="search-location"
                  :country="['us']"
                  v-on:placechanged="setPlace"
                  width="100%"
                >
                </vue-google-autocomplete 
              >--></v-col
              >
            </v-row>
            <v-row> </v-row>
          </v-card>

          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12 pa-12">
            <v-row class="pa-4">
              <v-file-input
                name="license-image"
                accept="image/*"
                label="Upload Drivers License"
                chips
                clearable
                prepend-inner-icon="mdi-cloud-outline"
                prepend-icon=""
              ></v-file-input>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="State Issued"
                  ><v-icon slot="prepend"> mdi-domain </v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  name="class"
                  label="Drivers License Issued"
                  v-model="driver.license.issued"
                  single-line
                  ><v-icon slot="prepend"> mdi-calendar </v-icon></v-text-field
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="License Class"
                  v-model="driver.license.class"
                  ><v-icon slot="prepend"> mdi-card-account-details </v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  name="class"
                  label="Drivers License Expiration"
                  v-model="driver.license.expiration"
                  single-line
                  ><v-icon slot="prepend"> mdi-update </v-icon></v-text-field
                >
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" @click="submit()"> Add Driver </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-form>
  </v-stepper>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      e1: 1,
      valid: true,
      form: {
        nameRules: [(v) => !!v || "Name is required"],
      },
      driver: {
        company_id: null,
      },
    };
  },
  components: {},

  methods: {
    setPlace(e, p, i) {
      this.driver.address.format = p.formatted_address;
      this.driver.address.comp = e;
    },
    async submit() {
      let driversGlobalId = "";
      try {
        const driver = firebase
          .firestore()
          .collection("drivers")
          .doc();
        this.driver.id = driver.id;
        driversGlobalId = driver.id;
        await driver.set(this.driver);
      } catch (error) {
        console.error(error);
      }

      try {
        const driDoc = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("drivers")
          .doc(driversGlobalId);
        await driDoc.set(this.driver);
      } catch (error) {
        console.error(error);
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
