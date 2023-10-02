<template>
  <div>
    <div class="mb-2">
      <strong>{{ name }}</strong>
    </div>
    <VImg :src="picture.url" :height="150" class="mb-2" />
    <ThemedLink v-if="addressLink" :href="addressLink" external>
      {{ addressStreet }}, {{ addressZip }}
      {{ addressPlace }}
    </ThemedLink>
    <ThemedLink :href="link" external>{{ link }}</ThemedLink>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ThemedLink from "@/components/ThemedLink.vue";
import { Sponsor } from "@/types";

const props = defineProps<Sponsor>();

const addressLink = computed(() => {
  if (props.addressStreet && props.addressPlace && props.addressZip) {
    return `https://maps.google.com/?q=${`${props.addressStreet} ${props.addressZip} ${props.addressPlace}`}`;
  }
  return null;
});
</script>
