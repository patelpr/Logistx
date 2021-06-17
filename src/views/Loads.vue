<template>
  <v-row width="100%" no-gutters>
    <v-col cols="10"> <Map :load="selectedLoad" :polyline="poly" /></v-col>
    <v-col cols="2"
      ><v-navigation-drawer right>
        <v-card>
          <v-row>
            <v-col cols="6">
              <v-card-subtitle>{{
                selectedLoad.origin.location.address_components.streetnumber +
                " " +
                selectedLoad.origin.location.address_components.street
              }}</v-card-subtitle>
              <v-card-subtitle>{{
                selectedLoad.origin.location.address_components.city +
                ", " +
                selectedLoad.origin.location.address_components.state +
                " " +
                selectedLoad.origin.location.address_components.postcode +
                " " +
                selectedLoad.origin.location.address_components.country
              }}</v-card-subtitle>
            </v-col>
            <v-col cols="6">
              <v-card-title>Destination</v-card-title>

              <v-card-subtitle>{{
                selectedLoad.destination.location.formatted_address
              }}</v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
        <v-list nav dense>
          <v-divider></v-divider>
          <v-list-item
            v-for="(load, i) in loads"
            :key="i"
            @click="selectLoad(load)"
          >
            <v-row no-gutters>
              <v-col cols="5">
                <v-list-item-title>{{
                  load.origin.location.address_components.city
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  load.origin.location.address_components.state
                }}</v-list-item-subtitle>
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-menu-right</v-icon>
              </v-col>

              <v-col cols="5">
                <v-list-item-title>{{
                  load.destination.location.address_components.city
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  load.destination.location.address_components.state
                }}</v-list-item-subtitle>
              </v-col>
            </v-row>
            <!-- <v-list-item-action>
              <v-btn
                icon
                :to="{ name: 'Load', params: { id: load.id, load: load } }"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click="archiveLoad(load.id)">
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import Map from "../components/Map.vue";
export default {
  components: {
    Map,
  },
  created() {
    this.getLoads();
  },
  methods: {
    async getLoads() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .where("active", "==", true)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.selectLoad(doc.data());
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
          .doc()
          .collection("loads")
          .doc(id)
          .update({ active: false });
      } catch (error) {
        console.log(error);
      }
    },
    selectLoad(load) {
      this.selectedLoad = load;
      this.poly = load.route.geometry;
    },
  },
  data() {
    return {
      selectedLoad: this.loads[0],
      poly: null,
      loads: [],
    };
  },
};
</script>

<style>
</style>