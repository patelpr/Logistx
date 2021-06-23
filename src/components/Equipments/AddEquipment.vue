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
        <v-card class="mb-12 pa-12" elevation="0">
          <v-card-title>Equpiment VIN</v-card-title>
          <v-row>
            <v-text-field
              v-model="equipment.vin"
              name="vin"
              label="Vin Number"
              single-line
              prepend-icon="mdi-truck-outline"
              @blur="VINcheck()"
            ></v-text-field
          ></v-row>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12 pa-12 ">
          <v-row>
            <v-card-title>
              {{
                equipment["Model Year"] +
                  " " +
                  equipment["Make"] +
                  " " +
                  equipment["Model"]
              }}
            </v-card-title>
          </v-row>

          <v-row d-flex align-content-space-around flex-wrap>
            <v-text-field
              class="ma-2"
              v-for="(item, i) in Object.entries(equipment)"
              :key="i"
              single-line
              :label="item[0]"
              :value="item[1]"
              :hint="item[0]"
              filled
              persistent-hint
              outlined
              dense
              onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';"
              :v-model="equipment[item[0]]"
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
        console.log(error);
      }
    },
    async equipmentSubmit() {
      let docRef = fire
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("equipments")
        .doc();
      try {
        console.log(docRef);
        this.equipment.equipment_id = docRef.id;
        console.log(this.equipment);
        await docRef.set(this.equipment);
      } catch (error) {
        console.log(error);
      } finally {
        this.reRender++;

        this.$router.push("/equipments");
      }
    },
  },
};
</script>

<style></style>
