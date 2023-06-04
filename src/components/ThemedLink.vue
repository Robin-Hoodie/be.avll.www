<template>
  <a
    :href="href"
    target="_blank"
    class="themed-link"
    :class="external ? 'd-flex align-center' : null"
  >
    <slot />
    <v-icon v-if="external" class="ml-1" size="x-small">mdi-open-in-new</v-icon>
  </a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ href: string; external?: boolean }>(), {
  external: false,
});
</script>

<style scoped>
.themed-link {
  color: rgb(var(--v-theme-primary));
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
