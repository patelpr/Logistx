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
          :items="loads"
          :search="search"
        >
          <template v-slot:no-data>
            <v-card-title teal-title> No Matching Load! </v-card-title>
          </template>

          <template v-slot:no-results>
            <v-card-title teal-title> No Matching Load! </v-card-title>
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
    this.getloads();
  },
  methods: {
    // handleClick: (load) => {
    //   this.$router.push({
    //     name: "Load",
    //     params: {
    //       load: load,
    //     },
    //   });
    // },
    async getloads() {
      this.loads = [];
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads");

        docRef.onSnapshot((querySnapshot) => {
 

          querySnapshot.forEach((doc) => {
            this.loads.push(doc.data());
          });
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    },
    archiveLoad(id) {
      try {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .doc(id)
          .update({ active: false });
      } catch (error) {
        console.error(error);
      }
    },
  },
  data() {
    return {
      loads: [],
      search: "",
      headers: [
        {
          text: "Load ID",
          align: "start",
          value: "load.id",
        },
        { text: "Origin", value: "load.origin" },
        { text: "Destination", value: "load.destination" },
        { text: "Rate", value: "load.rate" },
        { text: "Weight", value: "load.weight" },
        { text: "Trailer", value: "load.type" },
      ],
    };
  },
};
</script>

<style></style>
