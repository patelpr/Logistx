<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title
        >EQUIPMENT
        {{
          selectedEquipment.createdAt || "No Equipment Selected"
        }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn text icon @click="archiveEquipment(selectedEquipment.id)"
        ><v-icon>mdi-archive</v-icon></v-btn
      >
      <a target="_blank" :href="link()">
        <v-btn text icon><v-icon>mdi-navigation-outline</v-icon></v-btn></a
      >
    </v-toolbar>
    <v-tabs>
      <v-tab-item>
        <v-card flat elevation="0">
          <v-row>
            <v-col cols="12" md="6" align="start"> </v-col>
            <v-col cols="12" md="6"> </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat> </v-card>
      </v-tab-item>
      <v-tab>
        <v-icon left> mdi-dolly </v-icon>
        EQUIPMENT INFO
      </v-tab>
      <v-tab>
        <v-icon left> mdi-steering </v-icon>
        Driver/Equipment
      </v-tab>
      <v-tab>
        <v-icon left> mdi-currency-usd </v-icon>
        Costs
      </v-tab>
    </v-tabs>
  </v-card>
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
    !this.selectedEquipment && this.getEquipments();
  },
  methods: {
    link() {
      return `https://www.google.com/maps/dir/${this.selectedEquipment.origin.location.formatted_address}/${this.selectedEquipment.destination.location.formatted_address}/`;
    },
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
