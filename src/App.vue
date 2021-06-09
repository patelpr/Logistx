<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      color="grey lighten-3"
      expand-on-hover
    >
      <v-list nav>
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-list-item v-for="link in links" :key="link.name" link :to="link.url">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
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
    <v-navigation-drawer app right>
      <v-list>
        <!-- LOADS -->
      </v-list>
    </v-navigation-drawer>
    <v-container  pa-0>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    drawer: null,
    links: [
      {
        name: "Equipment",
        icon: "mdi-truck-outline",
        url: "/equipment",
      },
      {
        name: "Loads",
        icon: "mdi-map",
        url: "/loads",
      },
      {
        name: "Drivers",
        icon: "mdi-steering",
        url: "/drivers",
      },
      {
        name: "Add Loads",
        icon: "mdi-plus",
        url: "/addloads",
      },
    ],
  }),
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
