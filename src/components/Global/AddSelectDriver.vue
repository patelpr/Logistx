<template>
  <v-col>
    <v-combobox
      v-model="selectedDriver"
      :items="drivers"
      :item-value="drivers.id"
      item-text="firstName"
      no-data-text
      return-object
      label="Assign Driver"
      solo-inverted
      v-if="drivers && !add"
      @change="setDriver"
    ></v-combobox>
    <v-btn @click="add = true" v-if="!selectedDriver">Add Driver</v-btn>
    <v-form @submit="addDriver" v-if="add">
      <v-text-field
        label="First Name"
        v-model="driver.firstName"
      ></v-text-field>
      <v-text-field label="Last Name" v-model="driver.lastName"></v-text-field>
      <v-text-field label="Email" v-model="driver.email"></v-text-field>
      <v-text-field
        label="License Num"
        v-model="driver.licenseNum"
      ></v-text-field>

      <v-text-field
        label="License State"
        v-model="driver.licenseState"
      ></v-text-field>
      <v-text-field label="Phone" v-model="driver.phone"></v-text-field>

      <v-btn type="submit">Add</v-btn>
      <v-btn class="ml-2" text @click="add = false">Cancel</v-btn>
    </v-form>
  </v-col>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    drivers: [],
    selectedDriver: null,
    add: false,
    driver: {
      id: "",
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
      licenseNum: "",
      licenseState: "",
    },
  }),
  props: {
    load: {
      type: Object,
    },
  },
  mounted() {
    this.getDrivers();
  },
  methods: {
    setDriver(e) {
      this.$emit("setdriver", e.id);
    },
    async getDrivers() {
      this.drivers = [];
      let snapshot = await firebase
        .firestore()
        .collection("drivers")
        .where("carrier", "==", firebase.auth().currentUser.uid)
        .onSnapshot((querySnapshot) =>
          querySnapshot.forEach((doc) => this.drivers.push(doc.data()))
        );
      snapshot.docs.map((doc) => this.drivers.push(doc.data()));
    },
    async addDriver(e) {
      e.preventDefault();
      //   let checkDoc = await firebase
      //     .firestore()
      //     .collection("drivers")
      //     .where("licenseNum", "==", this.driver.licenseNum).get();

      //
      //   if (!checkDoc.exists) {
      let docRef = await firebase.firestore().collection("drivers").doc();
      this.driver.id = docRef.id;
      this.driver.carrier = firebase.auth().currentUser.uid;
      docRef.set(this.driver);
      //   }
      //   else {
      //
      //     this.driver = checkDoc.data();
      //   }
      this.setDriver(this.driver);
      this.getDrivers();
      this.add = false;
    },
  },
};
</script>

<style>
</style>