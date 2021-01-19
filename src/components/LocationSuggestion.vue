<template>
  <div>
    <span>{{ item.name }}, {{ item.country }}</span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    item: { required: true }
  }
};
</script>
