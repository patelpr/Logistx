<template>
  <v-app>
    <Navbar />
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height style="background-color:lightgray"
        ><v-row no-gutters align="start" justify="space-around">
          <router-view></router-view>
        </v-row>
    <Add />

      </v-container>

    </v-content>
  </v-app>
</template>

<script>
import Add from "./components/Global/Add.vue";
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
    Add,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    window.onerror = function(msg, src, linenum, colnum, error) {
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
