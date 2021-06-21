<template>
  <v-navigation-drawer
    color="primary"
    dark
    expand-on-hover
    app
    permanent
    absolute
    left
  >
    <v-list nav>
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="white darken-1"
        size="36"
        :to="{name:'Account'}"

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
</template>

<script>
export default {
  data: () => ({
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

<style></style>
