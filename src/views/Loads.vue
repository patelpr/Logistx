<template>
  <v-row width="100%" no-gutters>
    <v-col cols="10"> <Map :load="selectedLoad" :polyline="poly"/></v-col>
    <v-col cols="2"
      ><v-navigation-drawer right width="100%">
        <v-list nav dense>
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
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">
                {{
                  (selectedLoad.route.summary.distance / 1609).toFixed(2)
                }}
                miles
              </div>
              <span
                >{{
                  setTime()
                }}
                </span
              >
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat>text</v-btn>
            <v-btn flat color="primary">text</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show">
              hidden text
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
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
  watch: {
    loads: function(x) {
      this.selectedLoad = x[0];
    },
  },
  methods: {
    setTime(){
    let d = Number(this.selectedLoad.route.summary.duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
    },
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
              console.log(doc.data());
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
      this.poly = load.route.geometry;
    },
  },
  data() {
    return {
      selectedLoad: null,
      poly: null,
      loads: [],
    };
  },
};
</script>

<style></style>
