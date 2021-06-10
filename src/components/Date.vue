<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="$emit('setdate', date)"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      date: null,
    };
  },

};
</script>

<style></style>
