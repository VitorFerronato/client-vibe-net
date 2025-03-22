<template>
  <div>
    <label>{{ label }}</label>
    <v-text-field
      v-bind="$attrs"
      :prepend-inner-icon="leftIcon"
      :append-inner-icon="rightIcon"
      :rules="rules"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      color="primary"
      class="mt-1"
    >
    </v-text-field>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "Label",
  },
  leftIcon: {
    type: String,
  },
  rightIcon: {
    type: String,
  },
  rules: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
