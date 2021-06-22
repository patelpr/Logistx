<template>
  <v-row>
    <v-col v-for="equip in equipments" :key="equip.equipment_id" cols="4">
      <v-card>
        <v-card-title>
          {{ equip.Make + " " + equip.Model }}
        </v-card-title>
        <v-card-subtitle>{{ equip["Model Year"] }}</v-card-subtitle>
        <v-card-actions>
          <v-btn
            icon
            :to="{
              name: 'Equipment',
              params: { id: equip.equipment_id, equipment: equip },
            }"
            @click="console(equip)"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    this.getEquipments();
  },
  methods: {
    console(x){
      console.log(x)
    },
    async getEquipments() {
      this.equipments = [];
      try {
        const docRef = firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments");

        await docRef.onSnapshot((querySnapshot) => {
          // console.log(querySnapshot);
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            this.equipments.push(doc.data());
          });
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    },
    // archiveEquipment(id) {
    //   try {
    //     firebase
    //       .firestore()
    //       .collection("users")
    //       .doc(firebase.auth().currentUser.uid)
    //       .collection("equipments")
    //       .doc(id)
    //       .update({ active: false });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
  data() {
    return {
      equipments: [],
    };
  },
};
</script>

<style></style>
