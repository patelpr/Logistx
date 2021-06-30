<template>
      <v-row>
        <v-col v-for="n in drivers" :key="n" cols="4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card color="primary" class="red--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">headline</div>
                        <div>description</div>
                      </div>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media
                        src="description"
                        height="125px"
                        contain
                      ></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      drivers: [],
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
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
