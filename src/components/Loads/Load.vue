<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>LOAD {{ load.createdAt }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :to="{
          name: 'Load',
          params: { id: load.id, load: load },
        }"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn text icon @click="archiveLoad(load.id)"
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
              <Address :load="load.origin" title="Pickup" />
            </v-col>
            <v-col cols="12" md="6">
              <Address :load="load.destination" title="Delivery" />
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
    if (!this.load) {
      this.load = this.getLoads();
    }
    console.log(this.load);
  },
  methods: {
    link() {
      return `https://www.google.com/maps/dir/${this.load.origin.location.formatted_address}/${this.load.destination.location.formatted_address}/`;
    },
    getLoads() {
      try {
        return firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc(this.id)
          .get()
          .then((doc) => (this.load = doc.data()));
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
      console.log();
    },
  },
};
</script>

<style>
</style>