<template>
  <v-sheet>
    <v-row>
    <v-toolbar flat color="secondary" dark >
      <v-toolbar-title
        >TRUCK
        {{
          selectedEquipment["Model Year"] +
          " " +
          selectedEquipment["Make"] +
          " " +
          selectedEquipment["Model"]
        }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn text icon @click="archiveEquipment(selectedEquipment.equipment_id)"
        ><v-icon>mdi-archive</v-icon></v-btn
      >
    </v-toolbar>
    </v-row>
    
  </v-sheet>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tab: 1,
      selectedEquipment: null,
    };
  },
  props: {
    id: {
      type: String,
    },
    equipment: {
      type: Object,
    },
  },
  created() {
    !this.selectedEquipment
      ? this.getEquipments()
      : (this.selectedEquipment = this.equipment);
  },
  methods: {
    async getEquipments() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments")
          .doc(this.id)
          .get()
          .then((doc) => (this.selectedEquipment = doc.data()));
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
      console.log();
    },
  },
};
</script>

<style></style>
