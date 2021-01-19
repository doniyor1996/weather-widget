<template>
  <div class="d-flex justify-content-between mt-4 add-location">
    <LocationIcon class="icon big" />
    <div class="d-flex flex-grow-1 ml-2 mr-4">
      <vue-suggestion
        :items="items"
        v-model="item"
        :setLabel="setLabel"
        :itemTemplate="itemTemplate"
        @changed="inputChange"
        @selected="itemSelected"
        placeholder="Add location"
      >
      </vue-suggestion>
    </div>
    <AddIcon class="icon big" @click="_addLocation" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AddIcon from "@/assets/add.svg";
import LocationIcon from "@/assets/location.svg";
import LocationSuggestion from "@/components/LocationSuggestion.vue";
import { weatherAPI, WeatherLocation } from "@/api/openWeatherAPI";
import { mapActions } from "vuex";

const items: Item[] = [];

export default Vue.extend({
  name: "AddLocation",
  components: { AddIcon, LocationIcon },
  data() {
    return {
      item: {},
      items,
      itemTemplate: LocationSuggestion
    };
  },
  methods: {
    ...mapActions(["addLocation"]),
    _addLocation() {
      if (this.item.id) this.addLocation(this.item);
      else alert("Please choose location from suggestion");
    },
    itemSelected(item) {
      this.item = item;
    },
    setLabel(item: WeatherLocation) {
      return item.name ? `${item.name}, ${item.country}` : "";
    },
    inputChange(text) {
      weatherAPI.findByName(text).then((response: WeatherLocation[]) => {
        this.items = response.filter(
          item => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
      });
    }
  }
});
</script>

<style scoped lang="scss">
@import "../assets/variables";
</style>
