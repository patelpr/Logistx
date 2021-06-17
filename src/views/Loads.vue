<template>
  <v-row width="100%" no no-gutters>
    <v-col cols="10"> <Map :load="selectedLoad" /></v-col>
    <v-col cols="2"
      ><v-navigation-drawer right>
        <v-list nav dense>
          <h1>Loads</h1>
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
            <v-list-item-action>
              <v-btn icon :to="'/load/' + load.id">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn icon @click="archiveLoad(load.id)">
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </v-list-item-action>
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
              // doc.data() is never undefined for query doc snapshots
              this.loads.push(doc.data());
              this.selectLoad(doc.data());
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
    },
  },
  data() {
    return {
      selectedLoad: null,
      loads: [],
    };
  },
};
</script>

<style>
</style>