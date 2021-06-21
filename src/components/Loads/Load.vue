<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title
        >LOAD
        {{ selectedLoad.createdAt || "No Load Selected" }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn text icon @click="archiveLoad(selectedLoad.id)"
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
            <v-col cols="12" md="6" align="start">
              <Address :load="selectedLoad.origin" title="Pickup" />
            </v-col>
            <v-col cols="12" md="6">
              <Address :load="selectedLoad.destination" title="Delivery" />
            </v-col>
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
        LOAD INFO
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
import Address from "../Global/Address.vue";
import firebase from "firebase";
export default {
  components: {
    Address,
  },
  data() {
    return {
      tab: 1,
      selectedLoad: null,
    };
  },
  props: {
    id: {
      type: String,
    },
    load: {
      type: Object,
    },
  },
  created() {
    this.getLoads();
  },
  methods: {
    link() {
      return `https://www.google.com/maps/dir/${this.selectedLoad.origin.location.formatted_address}/${this.selectedLoad.destination.location.formatted_address}/`;
    },
    async getLoads() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc(this.id)
          .get()
          .then((doc) => (this.selectedLoad = doc.data()));
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
      console.log();
    },
  },
};
</script>

<style></style>
