<template>
  <div class="d-flex justify-content-between mt-4">
    <div class="d-flex flex-grow-1">
      <LocationIcon class="icon big" />
      <vue-suggestion
        :items="items"
        v-model="item"
        :setLabel="setLabel"
        :itemTemplate="itemTemplate"
        @changed="inputChange"
        @selected="itemSelected"
      >
      </vue-suggestion>
    </div>
    <AddIcon class="icon big" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AddIcon from "@/assets/add.svg";
import LocationIcon from "@/assets/location.svg";
import LocationSuggestion from "@/components/LocationSuggestion.vue";

export default Vue.extend({
  name: "AddLocation",
  components: { AddIcon, LocationIcon },
  data() {
    return {
      item: {},
      items: [
        { id: 1, name: "Golden Retriever" },
        { id: 2, name: "Cat" },
        { id: 3, name: "Squirrel" }
      ],
      itemTemplate: LocationSuggestion
    };
  },
  methods: {
    itemSelected(item) {
      this.item = item;
    },
    setLabel(item) {
      return item.name;
    },
    inputChange(text) {
      // your search method
      this.items = this.items.filter(item => item.name.contains(text));
      // now `items` will be showed in the suggestion list
    }
  }
});
</script>

<style scoped lang="scss">
@import "../assets/variables";
</style>
