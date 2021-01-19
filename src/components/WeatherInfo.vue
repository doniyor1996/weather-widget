<template>
  <div class="locations">
    <div class="location" v-for="location in locations" :key="location.id">
      <div class="d-flex justify-content-between">
        <img
          :src="
            `https://openweathermap.org/img/wn/${location.weather.icon}@2x.png`
          "
        />
        <span>{{ location.main.temp }}°C</span>
      </div>
      <div>
        Feels like {{ location.main.feels_like }}°C.
        <span style="text-transform: capitalize">{{
          location.weather.description
        }}</span>
      </div>
      {{ location.name }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "WeatherInfo",
  computed: {
    ...mapGetters(["locations"])
  }
});
</script>

<style scoped lang="scss"></style>
