<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app width="300">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        expand-on-hover
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>
        <v-list nav>
          <v-list-item link to="/equipment">
            <v-list-item-icon>
              <v-icon>mdi-truck-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Equipment</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/drivers">
            <v-list-item-icon>
              <v-icon>mdi-steering</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Drivers</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/loads">
            <v-list-item-icon>
              <v-icon>mdi-map</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Loads</v-list-item-title>
          </v-list-item>
          <v-divider class="mx-3 my-5"></v-divider>
          <v-list-item link @click="signout()">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-sheet color="grey lighten-5" height="128" width="100%"></v-sheet>

      <v-list class="pl-14" shaped>
        <!-- DRIVERS -->
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer app right>
      <v-list>
        <!-- LOADS -->
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>

    <!-- <v-footer app color="transparent" height="72" inset>
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer> -->
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({ drawer: null }),
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened.
          console.error(error);
        });
    },
  },
};
</script>
