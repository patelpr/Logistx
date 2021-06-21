<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    direction="left"
    fixed
    open-on-hover
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" dark fab>
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green" to="/drivers/add">
      <v-icon>mdi-steering</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo" to="/equipments/add">
      <v-icon>mdi-truck-outline</v-icon>
    </v-btn>
    <v-btn fab dark small color="red" to="/loads/add">
      <v-icon>mdi-dolly</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false,
    fling: false,
    hover: false,
  }),
};
</script>
