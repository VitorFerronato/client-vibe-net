<template>
  <v-btn v-bind="$attrs" @click="$emit('click', $event)" color="primary">
    {{ label }}
  </v-btn>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "label",
  },
  outlined: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
