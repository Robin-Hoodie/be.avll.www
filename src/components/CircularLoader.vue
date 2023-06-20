<template>
  <div class="loader-container">
    <v-progress-circular
      color="primary"
      :size="size === 'medium' ? 30 : 50"
      indeterminate
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size: "medium" | "large" }>(), {
  size: "medium",
});
</script>

<style scoped>
.loader-container {
  height: 100%;
  display: grid;
  place-content: center;
}
</style>
