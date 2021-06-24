<template>
  <v-sheet >
    <v-row>
      <v-toolbar v-if="selectedEquipment" flat color="secondary" dark class="pl-3 pr-3">
        <v-toolbar-title
          >TRUCK
          {{
            selectedEquipment["Model Year"] +
            " " +
            selectedEquipment["Make"] +
            " " +
            selectedEquipment["Model"]
          }}</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-btn
          text
          icon
          @click="archiveEquipment(selectedEquipment.equipment_id)"
          ><v-icon>mdi-archive</v-icon></v-btn
        >
      </v-toolbar>
    </v-row>
    <v-row d-flex align-content-space-around flex-wrap class="pa-5">
      <v-text-field
        class="ma-2"
        v-for="(item, i) in Object.entries(equipment)"
        :key="i"
        single-line
        :label="item[0]"
        :value="item[1]"
        :hint="item[0]"
        filled
        placeholder=""
        persistent-hint
        outlined
        dense
        onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';"
        :v-model="equipment[item[0]]"
      ></v-text-field>
    </v-row>
  </v-sheet>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tab: 1,
      selectedEquipment: null,
    };
  },
  props: {
    id: {
      type: String,
    },
    equipment: {
      type: Object,
    },
  },
  created() {
    !this.selectedEquipment
      ? this.getEquipments()
      : ((this.selectedEquipment = this.equipment),
        consoleee.log(this.selectedEquipment));
  },
  methods: {
    async getEquipments() {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments")
          .doc(this.id)
          .get()
          .then((doc) => (this.selectedEquipment = doc.data()));
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
      console.log();
    },
  },
};
</script>

<style></style>
