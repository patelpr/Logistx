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
            <v-card-title primary-title>
              No Drivers!
            </v-card-title>
          </template>

          <template v-slot:no-results>
            <v-card-title primary-title>
              No Matching Drivers!
            </v-card-title>
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
      headers: {},
    };
  },
  created() {
    this.getDrivers();
  },
  methods: {
    async getDrivers() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("drivers")
          .where("active", "==", true)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.drivers.push(doc.data());
            });
            console.log(this.drivers);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
