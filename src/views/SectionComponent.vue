<template>
  <div>
    <div class="q-px-md q-py-sm">
      <div class="q-my-xs">
        {{label}}
      </div>
    </div>
    <q-separator />

    <div :class="noBorder ? 'q-py-md' : 'q-pa-md'">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionComponent",
  props: {
    label: String,
    noBorder: {
      type: Boolean,
      default: () => {
        return false
      }
    },
  }
}
</script>

<style scoped>

</style>
