<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="array"
      :search="search"
      @click:row="handleClick"
    >
      <template v-slot:no-data>
        <v-card-title primary-title>
          No Results!
        </v-card-title>
      </template>

      <template v-slot:no-results>
        <v-card-title primary-title>
          No Matching Results!
        </v-card-title>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      search: "",
    };
  },
  props: {
    array: {
      type: Array,
    },
    headers: {
      type: Object,
    },
  },
  methods: {
    handleClick: (equip) => {
      console.log(equip);
      this.$router.push({
        name: "Equipment",
        params: { id: equip.equipment_id, equipment: equip },
      });
    },
  },
};
</script>
<style></style>
