<template>
  <v-stepper v-model="e1" non-linear>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Driver Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          License Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="3">
          Employment History
        </v-stepper-step>
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
                  ><v-icon slot="prepend">
                    mdi-account
                  </v-icon></v-text-field
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
                  ><v-icon slot="prepend">
                    mdi-account
                  </v-icon></v-text-field
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
                  <v-icon slot="prepend">
                    mdi-cake
                  </v-icon>
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
                  ><v-icon slot="prepend">
                    mdi-at
                  </v-icon></v-text-field
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
                  <v-icon slot="prepend">
                    mdi-phone
                  </v-icon>
                </v-text-field></v-col
              ><v-col cols="12" md="4">
                <v-text-field
                  name="driver_ssn"
                  label="Driver SSN"
                  v-model="driver.ss"
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
                  id="driveraddress"
                  class="pa-5"
                  style="border:1px solid gray;"
                  placeholder="Driver Address"
                  classname="search-location"
                  :country="['us']"
                  v-on:placechanged="setPlace"
                  width="100%"
                >
                </vue-google-autocomplete
              > -->
              </v-col>
            </v-row>
            <v-row> </v-row>
          </v-card>

          <v-btn color="teal" @click="e1 = 2">
            Continue
          </v-btn>
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
                  ><v-icon slot="prepend">
                    mdi-domain
                  </v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  name="class"
                  label="Drivers License Issued"
                  v-model="driver.license.issued"
                  single-line
                  ><v-icon slot="prepend">
                    mdi-calendar
                  </v-icon></v-text-field
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="License Class"
                  v-model="driver.license.class"
                  ><v-icon slot="prepend">
                    mdi-card-account-details
                  </v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  name="class"
                  label="Drivers License Expiration"
                  v-model="driver.license.expiration"
                  single-line
                  ><v-icon slot="prepend">
                    mdi-update
                  </v-icon></v-text-field
                >
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="teal" @click="e1 = 3">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12 pa-12">
            <v-card
              v-for="(h, i) in driver.work.history"
              :key="i"
              class="pa-10 ma-5"
            >
              <v-row>
                <v-text-field
                  name="company"
                  v-model="driver.work.history[i].company"
                  label="Company"
                  single-line     
                  ><v-icon slot="prepend">
                    mdi-domain
                  </v-icon></v-text-field
                ></v-row
              >
              <v-row>
                <v-text-field
                  name="start"
                  v-model="driver.work.history[i].start"
                  v-mask="'##/##/####'"
                  label="Start"
                  messages="mm/dd/yyyy"
                  single-line
                  ><v-icon slot="prepend">
                    mdi-calendar-range
                  </v-icon></v-text-field
                ></v-row
              >
              <v-row>
                <v-text-field
                  name="finish"
                  v-model="driver.work.history[i].finish"
                  label="Finish"
                  v-mask="'##/##/####'"
                  messages="mm/dd/yyyy"
                  single-line
                  ><v-icon slot="prepend">
                    mdi-calendar-range
                  </v-icon></v-text-field
                ></v-row
              >
              <v-row>
                <v-text-field
                  name="reason"
                  v-model="driver.work.history[i].reason"
                  label="Reason for leaving"
                  single-line
                  ><v-icon slot="prepend">
                    mdi-text-box
                  </v-icon></v-text-field
                >
              </v-row>
            </v-card>

            <v-row class="mb-12 pa-12"
              ><v-btn @click="addEmployment">Add Employment </v-btn></v-row
            >
          </v-card>

          <v-btn color="teal" type="submit" @click="submit()">
            Submit
          </v-btn>

          <v-btn text>
            Cancel
          </v-btn>
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
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
      },
      driver: {
        license: {
          number: null,
          url: null,
          class: null,
          expiration: null,
          state: null,
          issued: null,
        },

        dob: null,
        fName: "",
        lName: "",

        address: {
          format: null,
          comp: null,
        },
        email: "",
        ssn: null,
        check: {
          background: null,
          bg_url: null,
          mvr: null,
          mvr_url: null,
          drug: null,
          drug_url: null,
        },
        work: {
          history: [
            {
              company: null,
              start: null,
              finish: null,
              reason: null,
            },
          ],
        },
        company_id: null,
      },
    };
  },
  components: {
  },

  methods: {
    addEmployment() {
      let add = {
        company: null,
        start: null,
        finish: null,
        reason: null,
      };
      this.driver.work.history.push(add);
      
    },
    setPlace(e, p, i) {
      this.driver.address.format = p.formatted_address;
      this.driver.address.comp = e;
      //   
    },
    submit() {
      try {
        firebase
          .firestore()
          .collection("drivers")
          .add(this.driver);
      } catch (error) {
        console.error(error);
      }
    },
    clear() {
      this.$refs.form.reset();
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
  outline:lightorange;
  height: 30px;
  line-height: 30px;
}
</style>
