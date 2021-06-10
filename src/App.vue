<template>
  <v-app>
      <Navbar />

    <v-container>

      <v-row>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-row>
    </v-container>

    <!-- <v-navigation-drawer app right>
      <v-list>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-main> -->

    <!-- </v-main> -->
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import firebase from "firebase";
export default {
  components: {
    Navbar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
