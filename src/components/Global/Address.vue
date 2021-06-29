<template>
  <div>
    <v-card elevation="0">
      <v-card-title> {{ title }} Information </v-card-title>
      <v-card-subtitle v-if="load.date">
        {{ title + " Time: " }}<br />{{ load.date }}
      </v-card-subtitle>
      <v-card-subtitle v-if="load.time">
        {{ load.time }}
      </v-card-subtitle>
      <v-card-subtitle>
        {{ load.location.formatted_address }}
      </v-card-subtitle>

      <v-card-subtitle v-if="load.ref">
        {{ title + " Reference: " + load.ref }}
      </v-card-subtitle>
      <v-card-subtitle v-if="load.location.url">
        <a :href="load.location.url" target="_blank"
          ><v-icon>mdi-map</v-icon></a
        >
      </v-card-subtitle>
    </v-card>
    <v-card v-if="!load.location.formatted_address">
      <h3 class="pa-3">NO {{ title.toUpperCase() }} SELECTED</h3>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    load: { type: Object },
    title: {
      type: String,
    },
  },
};
</script>

<style></style>
