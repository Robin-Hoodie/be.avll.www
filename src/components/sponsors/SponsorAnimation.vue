<template>
  <VCarousel
    hide-delimiters
    cycle
    :show-arrows="false"
    :height="100"
    class="pa-2"
  >
    <VCarouselItem v-for="sponsor in sponsors" :key="sponsor.id">
      <ThemedLink :href="sponsor.link">
        <VImg :src="sponsor.picture.url" />
      </ThemedLink>
    </VCarouselItem>
  </VCarousel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getSponsors } from "@/api-client";
import { Sponsor } from "@/types";
import ThemedLink from "../ThemedLink.vue";

const sponsors = ref<Sponsor[]>([]);

onMounted(async () => {
  sponsors.value = await getSponsors();
});
</script>
