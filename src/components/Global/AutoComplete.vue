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
  methods: {
    assessLocale(place) {
      let address_comp = {};
      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address_comp.streetnumber = component.long_name;
            break;
          }

          case "route": {
            address_comp.street = component.long_name;
            break;
          }

          case "postal_code": {
            address_comp.postcode = component.long_name;
            break;
          }

          case "postal_code_suffix": {
            address_comp.postcode_suffix = component.long_name;
            break;
          }
          case "locality":
            address_comp.city = component.long_name;
            break;

          case "administrative_area_level_1": {
            address_comp.state = component.short_name;
            break;
          }
          case "country":
            address_comp.country = component.long_name;
            break;
        }
      }

      place.address_components = address_comp;
      return place;
    },
  },
  watch: {
    autocompleteLocationModel(newVal) {
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
          x.lat = x.geometry.location.lat();
          x.lng = x.geometry.location.lng();
          x = this.assessLocale(x);

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
        .then(function (res) {
          _vue.locationEntries = res;
        })
        .catch(function (err) {
          // error handling goes here
          console.error(err);
        });
    },
  },
  // ...
};
</script>
