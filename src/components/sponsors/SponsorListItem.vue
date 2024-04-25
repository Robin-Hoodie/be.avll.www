<template>
  <div>
    <div class="mb-2">
      <strong>{{ attributes.name }}</strong>
    </div>
    <VImg
      v-if="attributes.picture.data"
      :src="attributes.picture.data.attributes.url"
      :height="150"
      class="mb-2"
    />
    <ThemedLink v-if="addressLink" :href="addressLink" external>
      {{ attributes.addressStreet }}, {{ attributes.addressZip }}
      {{ attributes.addressPlace }}
    </ThemedLink>
    <ThemedLink :href="attributes.link" external>{{
      attributes.link
    }}</ThemedLink>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ThemedLink from "@/components/ThemedLink.vue";
import { Sponsor } from "@/types";

const props = defineProps<Sponsor>();

const addressLink = computed(() => {
  if (
    props.attributes.addressStreet &&
    props.attributes.addressPlace &&
    props.attributes.addressZip
  ) {
    return `https://maps.google.com/?q=${`${props.attributes.addressStreet} ${props.attributes.addressZip} ${props.attributes.addressPlace}`}`;
  }
  return null;
});
</script>
