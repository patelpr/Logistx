<template>
  <v-navigation-drawer
    color="secondary"
    dark
    expand-on-hover
    app
    permanent
    fixed
    z-index="1"
    bottom
    left
  >
    <v-list nav>
      <router-link :to="{ name: 'Account' }">
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="white darken-1"
          size="36"
        >
          <img v-if="false" />
          <span v-else class="black--text text-h5">PP</span></v-avatar
        >
      </router-link>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-list-item v-for="link in links" :key="link.name" link :to="link.url">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ link.name }}</v-list-item-title>
      </v-list-item>

      <v-divider class="mx-3 my-5"></v-divider>
      <Login />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Login from "../Global/Login.vue";
import firebase from "firebase";

export default {
  data: () => ({
    links: [
      {
        name: "Equipments",
        icon: "mdi-truck-outline",
        url: "/equipments",
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
    ],
  }),
  components: {
    Login,
  },
};
</script>

<style></style>
