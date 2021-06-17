<template>
  <v-sheet>
    <v-toolbar>
      <v-toolbar-title>{{ id }}</v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-toolbar>
    <v-row>
      {{ load }}
    </v-row>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
export default {
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
  },
  methods: {
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
    },
  },
};
</script>

<style>
</style>