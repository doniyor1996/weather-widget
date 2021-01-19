<template>
  <div>
    <b>#{{ item.id }}</b>
    <span>{{ item.name }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    item: { required: true }
  }
});
</script>
