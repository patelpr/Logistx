<template>
  <div>
    <v-card elevation="0">
      <v-card-title> {{ title }} Information </v-card-title>
      <v-card-subtitle v-if="load.time">
        {{ title + " time: "}}<br>{{ Date(load.time).toString() }}
      </v-card-subtitle>
      <v-card-text>
        {{ load.location.formatted_address }}
      </v-card-text>

      <v-card-text v-if="load.ref">
        {{ title + " Reference: " + load.ref || "None" }}
      </v-card-text>
      <v-card-text v-if="load.location.url">
        <a :href="load.location.url" target="_blank"
          ><v-icon>mdi-map</v-icon></a
        >
      </v-card-text>
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
