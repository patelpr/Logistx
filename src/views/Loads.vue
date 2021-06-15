<template>
  <div>
    <v-navigation-drawer absolute right>

      <v-list nav dense>
        <h1>Loads</h1>
        <v-list-item
          v-for="load in loads"
          :key="load.id"
          @click="
            setLoads(
              load.origin.location.latitude,
              load.origin.location.longitude,
              load.destination.location.latitude,
              load.destination.location.longitude
            )
          "
        >
          <v-row>
            <v-col cols="5">{{
              load.origin.location.address_components.city +
              ", " +
              load.origin.location.address_components.state
            }}</v-col>
            <v-icon>mdi-menu-right</v-icon>
            <v-col cols="5">{{
              load.origin.location.address_components.city +
              ", " +
              load.destination.location.address_components.state
            }}</v-col>
          </v-row>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <Map :center="center" :origin="originCoord" :destination="destinationCoord" />
  </div>
</template>

<script>
import firebase from "firebase";
import Map from "./Map.vue";
export default {
  components: {
    Map,
  },
  created() {
    this.getLoads();
    this.center = [32.8323435,-97.1628612]
  },
  methods: {

    async getLoads() {
      const getload = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("loads")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.loads.push(doc.data());
          });
          console.log(this.loads);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    setLoads(a,b,c,d){
      this.center  = [(a+c)/2,(b+d)/2]
      this.originCoord = [a,b]
      this.destinationCoord = [c,d]
      console.log(arguments)
    }
  },
  data() {
    return {
      originCoord: [32.8323435,-97.1628612],
      destinationCoord: [31.8323435,-96.1628612],
      center: null,
      address: {
        1: {},
        2: {},
      },
      loads: [],
    };
  },
};
</script>

<style>
</style>