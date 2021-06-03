<template>
              <input
              type="text"
              ref="autocomplete"
              required
              v-model="address"
              
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
        const place = autocomplete.getPlace();

        console.log(place);
      });
    }
  }
</script>

<style>

</style>