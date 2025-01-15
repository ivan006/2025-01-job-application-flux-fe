<template>
  <div class="">
    <template v-if="superOptions.model.rules.readable(item)">
      <q-btn outline color="white" text-color="black" label="Open" />
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  superOptions: {
    type: Object,
    default: () => {}
  },
});

</script>

<style scoped>

</style>
