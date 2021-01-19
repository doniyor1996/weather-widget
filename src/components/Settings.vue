<template>
  <div class="locations">
    <div
      class="location d-flex justify-content-between my-2"
      v-for="location in locations"
      :key="location.id"
    >
      <div>
        <HamburgerIcon class="icon big move-cursor" />
        <span>{{ location.name }}</span>
      </div>
      <div>
        <DeleteIcon class="icon big" />
      </div>
    </div>
    <AddLocation />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import HamburgerIcon from "@/assets/hamburger.svg";
import DeleteIcon from "@/assets/delete.svg";
import AddLocation from "@/components/AddLocation.vue";

export default Vue.extend({
  name: "Settings",
  components: { AddLocation, HamburgerIcon, DeleteIcon },
  computed: {
    ...mapGetters(["locations"])
  }
});
</script>

<style scoped lang="scss">
@import "../assets/variables";

.location {
  padding: 5px;
  background-color: $gray;

  div {
    display: flex;
    align-items: center;
  }
}
</style>
