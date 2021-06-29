<template>
  <v-layout row justify-center>
    <!-- ... -->
    <v-autocomplete
      label="Location"
      id="decoy"
      prepend-icon="mdi-map-marker"
      v-model="autocompleteLocationModel"
      :items="locationFoundItems"
      :search-input.sync="locationSearchText"
      item-text="value"
      item-value="id"
      hide-no-data
      return-object
    >
    </v-autocomplete>
    <!-- ... -->
  </v-layout>
</template>

<script>
/* eslint handle-callback-err: "warn" */
import { GetSuggestions } from "../../../PlacesUtils";

export default {
  data() {
    return {
      autocompleteLocationModel: null,
      locationSearchText: null,
      locationEntries: [],
    };
  },
  computed: {
    locationFoundItems() {
      return this.locationEntries;
    },
  },
  watch: {
    autocompleteLocationModel(newVal) {
      console.log(newVal.id);
      let resplace = new google.maps.places.PlacesService(
        document.getElementById("decoy") // named decoy because you can place on any old div, useless but required to access places Services
      );

      resplace.getDetails(
        {
          placeId: newVal.id,
          fields: [
            "address_components",
            "business_status",
            "formatted_address",
            "formatted_phone_number",
            "geometry",
            "name",
            "opening_hours",
            "photos",
            "place_id",
            "plus_code",
            "url",
            "utc_offset_minutes",
          ],
        },
        (x) => {
          this.$emit("place", x);
        }
      );
    },

    locationSearchText(newVal) {
      var _vue = this;

      // If less than 3 chars typed, do not search
      if (!newVal || newVal.length <= 3) return;

      // Call the method from the previous section here
      GetSuggestions(newVal)
        .then(function(res) {
          _vue.locationEntries = res;
        })
        .catch(function(err) {
          // error handling goes here
          console.log(err);
        });
    },
  },
  // ...
};
</script>
