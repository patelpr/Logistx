<template>
  <v-row width="100%" no-gutters >
    <v-col cols="10" v-if="selectedLoad"> <Map  :load="selectedLoad" /></v-col>
    <v-col cols="2"
      ><v-navigation-drawer right width="100%">
                <v-card v-if="selectedLoad" elevation="0">
          <v-card-title primary-title>
            <div></div>
          </v-card-title>
          <v-card-subtitle>
            <div class="headline">
              {{ (selectedLoad.route.summary.distance / 1609).toFixed(2) }}
              miles
            </div>
            <span>{{ setTime() }} </span>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn icon
              :to="{
                name: 'Load',
                params: { id: selectedLoad.id, load: selectedLoad },
              }"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn text icon @click="archiveLoad(selectedLoad.id)" color="primary"
              ><v-icon>mdi-archive</v-icon></v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
          <!-- <v-slide-y-transition>
            <v-card-text v-show="show"> hidden text </v-card-text>
          </v-slide-y-transition> -->
        </v-card>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item
            v-for="(load, i) in loads"
            :key="i"
            @click="selectLoad(load)"
          >
            <v-row no-gutters align="stretch">
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
      try {
        this.loads = [];
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("loads")
          .where("active", "==", true)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log("newLoad");

              this.loads.push(doc.data());
              this.selectLoad(doc.data());
              console.log(this.selectedLoad);
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
    };
  },
};
</script>

<style></style>
