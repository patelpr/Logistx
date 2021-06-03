<template>
  <div class="here-map">
    <div
      ref="map"
      v-bind:style="{ width: width + '%', height: height }"
      style="float: left"
    ></div>
    <ol
      v-bind:style="{ width: 100 - width - 5 + '%' }"
      style="float: right; min-height: 530px; margin-left: 20px; margin-top: 0"
    >
      <li v-for="direction in directions">
        <p v-html="direction.instruction"></p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
      map: {},
      platform: {},
      router: {},
      geocoder: {},
      directions: [],
    };
  },
  props: {
    appId: String,
    appCode: String,
    lat: String,
    lng: String,
    width: String,
    height: String,
  },
  created() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode,
    });
    this.router = this.platform.getRoutingService();
    this.geocoder = this.platform.getGeocodingService();
  },
  mounted() {
    this.map = new H.Map(
      this.$refs.map,
      this.platform.createDefaultLayers().normal.map,
      {
        zoom: 10,
        center: { lng: this.lng, lat: this.lat },
      }
    );
  },
  methods: {
    route(start, finish) {
      var params = {
        mode: "fastest;car",
        representation: "display",
      };
      var waypoints = [];
      this.map.removeObjects(this.map.getObjects());
      this.directions = [];
      waypoints = [this.geocode(start), this.geocode(finish)];
      Promise.all(waypoints).then((result) => {
        var markers = [];
        for (var i = 0; i < result.length; i++) {
          params["waypoint" + i] = result[i][0].lat + "," + result[i][0].lng;
          markers.push(new H.map.Marker(result[i][0]));
        }
        this.router.calculateRoute(
          params,
          (data) => {
            if (data.response) {
              for (var i = 0; i < data.response.route[0].leg.length; i++) {
                this.directions = this.directions.concat(
                  data.response.route[0].leg[i].maneuver
                );
              }
              data = data.response.route[0];
              var lineString = new H.geo.LineString();
              data.shape.forEach((point) => {
                var parts = point.split(",");
                lineString.pushLatLngAlt(parts[0], parts[1]);
              });
              var routeLine = new H.map.Polyline(lineString, {
                style: { strokeColor: "blue", lineWidth: 5 },
              });
              this.map.addObjects([routeLine, ...markers]);
              this.map.setViewBounds(routeLine.getBounds());
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });
    },
    geocode(query) {
      return new Promise((resolve, reject) => {
        this.geocoder.geocode(
          { searchText: query },
          (data) => {
            if (data.Response.View[0].Result.length > 0) {
              data = data.Response.View[0].Result.map((location) => {
                return {
                  lat: location.Location.DisplayPosition.Latitude,
                  lng: location.Location.DisplayPosition.Longitude,
                };
              });
              resolve(data);
            } else {
              reject({ message: "No data found" });
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
};
</script>

<style scoped></style>
