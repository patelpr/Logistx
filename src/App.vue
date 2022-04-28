<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container
        fluid
        ma-0
        pa-0
        fill-height
        style="background-color: lightgray"
        ><v-row no-gutters align="start" justify="space-around">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-main>
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
