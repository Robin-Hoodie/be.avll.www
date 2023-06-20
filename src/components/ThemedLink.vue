<template>
  <a
    :href="href"
    target="_blank"
    class="text-primary themed-link"
    :class="external ? 'd-flex align-center' : null"
  >
    <slot />
    <VIcon v-if="external" class="ml-1" size="x-small">mdi-open-in-new</VIcon>
  </a>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ href: string; external?: boolean }>(), {
  external: false,
});
</script>

<style scoped>
.themed-link {
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
