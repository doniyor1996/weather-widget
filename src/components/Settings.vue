<template>
  <div class="locations">
    <Draggable
      :list="locations"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
    >
      <div
        class="location d-flex justify-content-between my-2"
        v-for="location in locations"
        :key="location.id"
      >
        <div>
          <HamburgerIcon class="icon big move-cursor handle" />
          <span>{{ location.name }}</span>
        </div>
        <div>
          <DeleteIcon class="icon big" @click="deleteLocation(location.id)" />
        </div>
      </div>
    </Draggable>
    <AddLocation />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import HamburgerIcon from "@/assets/hamburger.svg";
import DeleteIcon from "@/assets/delete.svg";
import AddLocation from "@/components/AddLocation.vue";
import Draggable from "vuedraggable";

export default Vue.extend({
  name: "Settings",
  components: { AddLocation, HamburgerIcon, DeleteIcon, Draggable },
  data() {
    return {
      enabled: true,
      dragging: false
    };
  },
  computed: {
    ...mapGetters(["locations"])
  },
  methods: {
    ...mapActions(["deleteLocation"])
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
