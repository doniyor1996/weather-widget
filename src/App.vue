<template>
  <div id="app">
    <div class="container">
      <AppHeader />

      <div class="widget-body">
        <WeatherInfo v-show="!showSettings" />
        <Settings v-if="showSettings" />
      </div>

      <div>
        Icons from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "./store";
import WeatherInfo from "@/components/WeatherInfo.vue";
import { mapActions, mapGetters } from "vuex";
import { weatherAPI } from "@/api/openWeatherAPI";
import Settings from "@/components/Settings.vue";
import VueSuggestion from "vue-suggestion";
import AppHeader from "@/components/AppHeader.vue";

Vue.use(VueSuggestion);

export default Vue.extend({
  store,
  name: "App",
  components: {
    AppHeader,
    Settings,
    WeatherInfo
  },
  computed: {
    ...mapGetters(["locations", "showSettings"])
  },
  methods: {
    ...mapActions(["addLocation", "syncWeatherInfo"])
  },
  mounted() {
    if (this.locations.length === 0) {
      navigator.geolocation.getCurrentPosition(p => {
        weatherAPI
          .getByCoordinates({
            lat: p.coords.latitude,
            lon: p.coords.longitude
          })
          .then(response => {
            this.addLocation(response);
          });
      });
    } else {
      this.syncWeatherInfo();
      // setInterval(() => {
      //   this.syncWeatherInfo();
      // }, SyncInterval);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "assets/variables";

#app {
  width: 100%;
  max-width: 500px;
  padding: 10px;
}

.widget-body {
  height: 100%;
  min-height: 480px;
  max-height: 680px;
  overflow-y: auto;
}
</style>
