<template>
  <div id="app">
    <div class="container">
      <div class="app-header d-flex justify-content-between">
        <div>{{ appTitle }}</div>
        <div class="d-flex">
          <div @click="updateForce" class="mr-2" :title="syncAt">
            <RefreshSVG class="icon" />
          </div>
          <div>
            <SettingSVG class="icon" />
          </div>
        </div>
      </div>

      <WeatherInfo />

      <div>
        Icons made by
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
          >Freepik</a
        >
        from
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
import { SyncInterval, APP_TITLE } from "@/appConstants";
import { mapActions, mapGetters } from "vuex";
import SettingSVG from "@/assets/settings.svg";
import RefreshSVG from "@/assets/refresh.svg";

export default Vue.extend({
  store,
  name: "App",
  components: {
    WeatherInfo,
    SettingSVG,
    RefreshSVG
  },
  data() {
    return {
      syncAt: "",
      appTitle: APP_TITLE
    };
  },
  computed: {
    ...mapGetters(["locations", "lastSync"])
  },
  methods: {
    ...mapActions(["addLocation", "syncWeatherInfo", "updateForce"]),
    updateSyncText() {
      const time = new Date().getTime() - this.lastSync;
      const minutesAgo = new Date(time).getMinutes();
      this.syncAt =
        minutesAgo <= 1
          ? "Recently updated"
          : `Updated ${minutesAgo} minutes ago`;
    }
  },
  mounted() {
    if (this.locations.length === 0) {
      navigator.geolocation.getCurrentPosition(p => {
        this.addLocation({
          coord: {
            lat: p.coords.latitude,
            lon: p.coords.longitude
          }
        });
      });
    } else {
      this.syncWeatherInfo();
      setInterval(() => {
        this.syncWeatherInfo();
      }, SyncInterval);
    }

    this.updateSyncText();
    setInterval(() => {
      this.updateSyncText();
    }, 5000);
  },
  watch: {
    lastSync() {
      this.updateSyncText();
    }
  }
});
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  max-width: 500px;
  padding: 10px;
}

.app-header {
  background-color: #f7f7f7;
  padding: 5px;
  border-radius: 10px 10px 0 0;
}

.icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
