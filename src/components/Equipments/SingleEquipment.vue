<template>
  <v-card class="ma-3 pb-3" width="100%">
    <v-toolbar
      v-if="selectedEquipment"
      flat
      color="secondary"
      class="mb-5"
    >
      <v-toolbar-title
        >TRUCK #
        {{
          selectedEquipment.info.id +
            " " +
            selectedEquipment.vinData["Model Year"] +
            " " +
            selectedEquipment.vinData["Make"] +
            " " +
            selectedEquipment.vinData["Model"]
        }}</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-btn text icon @click="archiveEquipment(selectedEquipment.equipment_id)"
        ><v-icon>mdi-archive</v-icon></v-btn
      >
      <template v-slot:extension>
        <v-tabs v-model="tab" background-color="transparent" align-with-title>
          <v-tab>
            INFO
          </v-tab>
          <v-tab>
            TRUCK DATA
          </v-tab>
          <v-tab>
            MAINTENANCE
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-row d-flex align-content-space-around flex-wrap class="ma-5">
            <v-text-field
              class="ma-2"
              v-for="(item, i) in Object.entries(selectedEquipment.info)"
              :key="i"
              single-line
              :label="item[0]"
              :value="item[1]"
              :hint="item[0]"
              filled
              persistent-hint
              outlined
              dense
              onblur="this.style.width = ((this.value.length + 1) * 8) + 'px';"
              v-model="selectedEquipment.info[item[0]]"
              @blur="updateEquipments"
            ></v-text-field>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-row d-flex align-content-space-around flex-wrap class="ma-5">
            <v-text-field
              class="ma-2"
              v-for="(item, i) in Object.entries(selectedEquipment.vinData)"
              :key="i"
              single-line
              :label="item[0]"
              :value="item[1]"
              :hint="item[0]"
              filled
              persistent-hint
              outlined
              disabled
              dense
              onblur="this.style.width = ((this.value.length + 1) * 8) + 'px';"
              v-model="selectedEquipment.vinData[item[0]]"
              @blur="updateEquipments"
            ></v-text-field>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-row class="ma-3">
            <v-btn @click="dialog = true" icon color="teal">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn color="teal"  slot="activator">Open Dialog</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Legal first name" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Legal last name" hint="example of persistent helper text" persistent-hint required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Email" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Password" type="password" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select label="Age" required :items="['0-17', '18-29', '30-54', '54+']"></v-select>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select label="Interests" multiple autocomplete chips :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      dialog: false,
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
    !this.equipment
      ? this.getEquipments()
      : (this.selectedEquipment = this.equipment);
  },
  methods: {
    async updateEquipments() {
      
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("equipments")
          .doc(this.id)
          .update(this.selectedEquipment);
        
      } catch (error) {
        console.error("Error updating documents: ", error);
      }
    },
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
    },
  },
};
</script>

<style></style>
