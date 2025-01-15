<template>
  <div class="text-right">
    <template v-if="superOptions.model.rules.editable(item)">
      <!--<q-btn outline color="white" text-color="black" label="Edit" style="display: inline-block;" />-->
      <q-btn
        outline
        color="white"
        text-color="black"
        label="Edit"
        @click="$emit('editItem', item)"
      />
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['editItem']);

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
