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
          :items="equipments"
          :search="search"
          @click:row="handleClick"
        >
          <template v-slot:no-data>
            <v-card-title primary-title> No Matching Equipment! </v-card-title>
          </template>

          <template v-slot:no-results>
            <v-card-title primary-title> No Matching Equipment! </v-card-title>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    this.getEquipments();
  },
  methods: {
    handleClick: (equip) => {
      this.$router.push({
        name: "Equipment",
        params: {
          equipment: equip,
        },
      });
    },
    async getEquipments() {
      this.equipments = [];
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments");

        await docRef.onSnapshot((querySnapshot) => {
          // 
          querySnapshot.forEach((doc) => {
            
            this.equipments.push(doc.data());
          });
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    },
    archiveEquipment(id) {
      try {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments")
          .doc(id)
          .update({ active: false });
      } catch (error) {
        console.error(error);
      }
    },
  },
  data() {
    return {
      equipments: [],
      search: "",
      headers: [
        {
          text: "Truck ID",
          align: "start",
          value: "info.id",
        },
        { text: "Make", value: "vinData.Make" },
        { text: "Year", value: "vinData.Model Year" },
        { text: "Model", value: "vinData.Model" },
        { text: "Mileage", value: "info.mileage" },
      ],
    };
  },
};
</script>

<style></style>
