<template>
  <v-stepper v-model="e1" non-linear elevation="0" :key="reRender">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" editable>
        Equipment Type
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2" editable>
        Equipment Overview
      </v-stepper-step>
    </v-stepper-header>
    <v-divider></v-divider>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5 pa-10" elevation="0">
          <v-card-title>Equpiment VIN</v-card-title>
          <v-row>
            <v-text-field
              v-model="equipment.vin"
              name="vin"
              label="Vin Number"
              single-line
              prepend-icon="mdi-truck-outline"
            ></v-text-field
          ></v-row>
        </v-card>
        <v-btn color="primary" @click="VINcheck()"> Get Truck Details</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5 pa-10" v-if="equipment.vinData">
          <v-row>
            <v-card-title>
              {{
                equipment.vinData["Model Year"] +
                  " " +
                  equipment.vinData["Make"] +
                  " " +
                  equipment.vinData["Model"]
              }}
            </v-card-title>
            <v-text-field
              class="ma-2"
              single-line
              label="Truck ID Number"
              hint="Truck ID Number"
              filled
              persistent-hint
              outlined
              dense
              clearable
              v-model="equipment.info.id"
            ></v-text-field>
            <v-text-field
              class="ma-2"
              single-line
              label="Truck Mileage"
              hint="Truck Mileage"
              filled
              persistent-hint
              outlined
              dense
              clearable
              v-model="equipment.info.mileage"
            ></v-text-field>

            <!-- <v-text-field
              class="ma-2"
              single-line
              label="Truck Trailer"
              hint="Truck Trailer"
              filled
              persistent-hint
              outlined
              dense
              clearable
              v-model="equipment.info.type"
            ></v-text-field>  -->
          </v-row>
          <v-divider class="ma-12"></v-divider>
          <v-row d-flex align-content-space-around flex-wrap>
            <v-text-field
              class="ma-2"
              v-for="(item, i) in Object.entries(equipment.vinData)"
              :key="i"
              single-line
              :label="item[0]"
              :value="item[1]"
              :hint="item[0]"
              filled
              persistent-hint
              outlined
              dense
              clearable
              onblur="this. style.width = ((this.value.length + 1) * 8) + 'px';"
              :v-model="equipment.vinData[item[0]]"
            ></v-text-field>
          </v-row>
        </v-card>
        <v-btn text @click="e1--, (equipment = {})"> Change </v-btn>

        <v-btn color="primary" @click="equipmentSubmit()"> Save Truck </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
  data() {
    return {
      e1: 1,
      reRender: 0,
      equipment: {
        info: {
          id: null,
          mileage: null,
        },
        active: true,
        vin: "",
      },
    };
  },
  methods: {
    async VINcheck() {
      try {
        await axios
          .get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${this.equipment.vin}?format=json`
          )
          .then((res) => {
            let obj = {};
            

            res.data.Results.filter(
              (x) =>
                x.Value != null && x.Value != "" && x.Value != "Not Applicable"
            ).map((x) => {
              obj[x.Variable] = x.Value;
            });
            this.equipment.vinData = obj;
            this.e1++;
          });
      } catch (error) {
        console.error(error);
      }
    },
    async equipmentSubmit() {
      let docRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("equipments")
        .doc();
      
      try {
        
        this.equipment.equipment_id = docRef.id;
        
        await docRef.set(this.equipment);
      } catch (error) {
        console.error(error);
      } finally {
        this.$router.push({ path: "/equipments" });

      }
    },
  },
};
</script>

<style></style>
