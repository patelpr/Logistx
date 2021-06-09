<template>
              <input
              id="origin"
              type="text"
              required
              v-model="origin.address"
            />
</template>

<script>
export default {
      data() {
    return {
      address: "",
    };
  },
  mounted() {
    
      const autocomplete = new google.maps.places.Autocomplete(this.$refs['autocomplete']);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace().geometry.location;

        console.log(place);
      });
    }
  }
</script>

<style>

</style>