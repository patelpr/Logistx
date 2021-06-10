<template>
  <div>
    <input
      ref="autocomplete"
      placeholder="Search"
      class="search-location"
      onfocus="value = ''"
      type="text"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      {
        componentRestrictions: { country: ["us"] },
        fields: ["address_components", "geometry"],
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      console.log()
      this.$emit("changed", autocomplete.getPlace());
    });
  },
};
</script>
<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  background-color: #dcdde1;
  color: #2f3640;
}

.search-location {
  display: block;
  width: 60vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
</style>
