<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        label="Time"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      ampm-in-title
      v-model="time"
      full-width
      @change="setTime"
      @click:minute="menu2 = false"
    ></v-time-picker>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      time: null,
      menu2: false,
    };
  },
  methods: {
    setTime(e) {
      this.$emit("settime", this.time);
    },
  },
};
</script>
