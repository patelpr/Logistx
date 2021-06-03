/* global google */

<template
  ><div>
    <v-btn fab large right absolute @click="dialog = true">+</v-btn>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar flat dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add a Load</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="submit()">
              Submit
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <AutoComplete v-model="newLoad.origin" />
                </v-col>

                <v-col cols="12" md="6">
                  <AutoComplete v-model="newLoad.destination" />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-divider></v-divider>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* global google */
import AutoComplete from "./AutoComplete";

export default {
  components: {
    AutoComplete,
  },
  data() {
    return {
      dialog: false,
      newLoad: {
        origin: null,
        destination: null,
      },
    };
  },
  mounted() {
    for (let ref in this.$refs) {
      console.log(this.$refs[ref]);
      const autocomplete = new google.maps.places.Autocomplete(this.$refs[ref]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log(place);
      });
    }
  },
};
</script>

<style></style>
