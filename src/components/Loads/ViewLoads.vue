<template>
  <v-row no-gutters>
    <v-col cols="10"> <Map :load="selectedLoad"/></v-col>
    <v-col cols="2"
      ><v-navigation-drawer right width="16.6vw">
        <v-card v-if="selectedLoad" elevation="0">
          <!-- <Address :load="selectedLoad.origin[0]" title="Pickup" /> -->
          <!-- <Address :load="selectedLoad.destination[0]" title="Delivery" /> -->

          <div class="headline">
            {{ (selectedLoad.route.summary.distance).toFixed(2) }}
            miles
          </div>
          <span>{{ setTime() }} </span>

          <v-card-actions>
            <v-btn
              icon
              :to="{
                name: 'Load',
                params: { id: selectedLoad.id, load: selectedLoad },
              }"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn
              text
              icon
              @click="archiveLoad(selectedLoad.id)"
              color="primary"
              ><v-icon>mdi-archive</v-icon></v-btn
            >
            <a target="_blank" :href="link()">
              <v-btn text icon
                ><v-icon>mdi-navigation-outline</v-icon></v-btn
              ></a
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
        <v-card v-else class="pa-1">
          <v-card-title>Select Load Below </v-card-title>
        </v-card>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item
            v-for="(load, i) in loads"
            :key="i"
            @click="selectLoad(load)"
          >
            <v-row no-gutters>
              <v-col cols="5">
                <v-list-item-title>{{
                  load.origin[0].location.address_components.city
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  load.origin[0].location.address_components.state
                }}</v-list-item-subtitle>
              </v-col>
              <v-col cols="2">
                <v-icon>mdi-menu-right</v-icon>
              </v-col>

              <v-col cols="5">
                <v-list-item-title>{{
                  load.destination[0].location.address_components.city
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  load.destination[0].location.address_components.state
                }}</v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import Map from "../Map.vue";
// import Address from "../Global/Address.vue";
export default {
  components: {
    Map,
    // Address,
  },
  created() {
    this.getLoads();
  },
  methods: {
    link() {
      return `https://www.google.com/maps/dir/${this.selectedLoad.origin[0].location.formatted_address}/${this.selectedLoad.destination[0].location.formatted_address}/`;
    },
    setTime() {
      let d = Number(this.selectedLoad.route.summary.duration);
      var h = Math.floor(d / 3600);
      var m = Math.floor((d % 3600) / 60);
      var s = Math.floor((d % 3600) % 60);

      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return hDisplay + mDisplay + sDisplay;
    },
    async getLoads() {
      this.loads = [];
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .where("active", "==", true)
          .onSnapshot((querySnapshot) => {
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
      dialog: false,
    };
  },
};
</script>

<style></style>
