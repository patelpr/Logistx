<template>
  <v-navigation-drawer app fixed z-index="1" >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Logistx </v-list-item-title>
        <v-list-item-subtitle> Your Hub for Delivery service </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.link"
          active-class="white"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
    user: null,
    items: [
      {
        action: "mdi-account",
        items: [
          { link: "/", title: "Dashboard" },
          { link: "/account", title: "Account" },
        ],
        title: "User",
      },
      {
        action: "mdi-truck-outline",
        items: [
          { link: "/equipments", title: "Equipment List" },
          { link: "/add/equipments", title: "Add Equipment" },
        ],
        title: "Equipment",
      },
      {
        action: "mdi-map",
        active: true,
        items: [
          { link: "/loads", title: "Load Map" },
          { link: "/add/loads", title: "Add Loads" },
        ],
        title: "Loads",
      },
      {
        action: "mdi-steering",
        items: [
          { link: "/drivers", title: "Drivers List" },
          { link: "/add/drivers", title: "Add Driver" },
        ],
        title: "Drivers",
      },
    ],
  }),
  components: {
    Login,
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      console.log(this.user);
    });
  },
};
</script>

<style></style>
