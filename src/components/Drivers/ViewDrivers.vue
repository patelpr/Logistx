<template>
  <v-row d-flex align-content-space-around class="mx-auto">
    <v-col>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="drivers"
          :search="search"
          @click:row="handleClick"
        >
          <template v-slot:no-data>
            <v-card-title primary-title> No Drivers! </v-card-title>
          </template>

          <template v-slot:no-results>
            <v-card-title primary-title> No Matching Drivers! </v-card-title>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      drivers: [],
      search: "",
      headers: [
        {
          text: "Driver Id",
          align: "start",
          value: "licenseNum",
        },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Phone", value: "phone" },
        { text: "State", value: "licenseState" },
      ],
    };
  },
  created() {
    this.getDrivers();
  },
  methods: {
    handleClick: (equip) => {
      
      this.$router.push({
        name: "Driver",
        params: { id: equip.equipment_id, equipment: equip },
      });
    },
    async getDrivers() {
      try {
        await firebase
          .firestore()
          .collection("drivers")
          .where("carrier", "==", firebase.auth().currentUser.uid)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.drivers.push(doc.data());
            });
            
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
