<template>
  <div class="locations pt-3 px-2">
    <div
      class="location mb-4 border-bottom pb-3"
      v-for="location in locations"
      :key="location.id"
    >
      <h5 class="mb-3">{{ location.name }}, {{ location.country }}</h5>
      <div class="d-flex justify-content-center">
        <img
          :src="
            `https://openweathermap.org/img/wn/${location.weather.icon}@2x.png`
          "
        />
        <span class="h1 d-flex align-items-center ml-4"
          >{{ location.main.temp }}°C</span
        >
      </div>
      <div>
        Feels like {{ location.main.feels_like }}°C.
        <span style="text-transform: capitalize">{{
          location.weather.description
        }}</span>
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center pl-2">
          <div
            class="d-inline-block wind-arrow"
            :style="'transform: rotate(' + (location.wind.deg + 150) + 'deg)'"
          >
            <ArrowIcon class="icon" />
          </div>
          <span class="ml-3">{{ location.wind.speed }}m/s SSE</span>
        </div>
        <span class="ml-3">
          <GaugeIcon class="icon" />
          {{ location.main.pressure }}hPa
        </span>
      </div>
      <div>
        <span>Humidity {{ location.main.humidity }}%</span>
      </div>
      <div>
        <span>Visibility {{ location.visibility / 1000 }} km</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import ArrowIcon from "@/assets/arrow.svg";
import GaugeIcon from "@/assets/gauge.svg";

export default Vue.extend({
  name: "WeatherInfo",
  components: { ArrowIcon, GaugeIcon },
  computed: {
    ...mapGetters(["locations"])
  }
});
</script>

<style scoped lang="scss">
.wind-arrow {
  display: flex;
  height: 18px;
  width: 18px;
}
</style>
