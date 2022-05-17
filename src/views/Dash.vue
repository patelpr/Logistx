<template
  >
  <div>
    <v-container>
      <v-row>
        <v-col>
          <LoadList />
        </v-col>
      </v-row>
      <v-row>
        <v-col><ViewEquipments /></v-col>
        <v-col> <ViewDrivers /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ViewEquipments from "../components/Equipments/ViewEquipments.vue";
import ViewDrivers from "../components/Drivers/ViewDrivers.vue";
import LoadList from "../components/Loads/LoadList.vue";

export default {
  components: {
    ViewEquipments,
    ViewDrivers,
    LoadList,
  },
};
</script>

<style></style>
