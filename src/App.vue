<template>
  <v-app>
    <Navbar />

    <v-container>
      <v-row>
        <v-container class="pl-15">
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
    <v-alert
      dismissible
      border="top"
      type="error"
      icon="$mdiAccount"
      v-model="alert.msg"
    >
    </v-alert>
  </v-app>
</template>

<script>
import Navbar from "./components/Global/Navbar.vue";
import firebase from "firebase";
export default {
  data() {
    return {
      alert: {
        msg: null,
        src: null,
        linenum: null,
        colnum: null,
        error: null,
      },
    };
  },
  components: {
    Navbar,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    window.onerror = function(msg, src, linenum, colnum, error) {
      $("#app").append(``);
      /*your code*/
      this.alert.msg = msg;
      s;
      this.alert.src = src;
      s;
      this.alert.linenum = linenum;
      s;
      this.alert.colnum = colnum;
      s;
      this.alert.error = error;
      s;
    };
  },
};
</script>
