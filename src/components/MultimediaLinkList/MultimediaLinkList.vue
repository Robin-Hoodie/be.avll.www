<template>
  <VList>
    <VListItem v-for="link in links" :key="link.id">
      <ThemedLink :href="link.link" external>{{ link.description }}</ThemedLink>
    </VListItem>
  </VList>
</template>

<script lang="ts" setup>
import { MultimediaLink } from "@/types";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{ links: MultimediaLink[] }>();
</script>
