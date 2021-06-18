<template>
  <v-app>
      <Navbar />
      <v-container fluid class="pa-0" style="margin-left:56px;">
        <router-view></router-view>
      </v-container>
    <!-- <v-alert
      dismissible
      border="top"
      type="error"
      icon="mdiAccount"
      v-model="alert.msg"
    >
    </v-alert> -->
  </v-app>
</template>

<script>
import Navbar from "./components/Global/Navbar.vue";
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
    window.onerror = function (msg, src, linenum, colnum, error) {
      document.getElementById("app").append(``);
      /*your code*/
      this.alert.msg = msg;

      this.alert.src = src;

      this.alert.linenum = linenum;

      this.alert.colnum = colnum;

      this.alert.error = error;
    };
  },
};
</script>
<style>
body {
  box-sizing: border-box;
  overflow: hidden;
}
</style>