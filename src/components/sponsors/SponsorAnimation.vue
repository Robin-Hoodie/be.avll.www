<template>
  <VCarousel
    hide-delimiters
    cycle
    :show-arrows="false"
    :height="100"
    class="pa-2"
  >
    <VCarouselItem v-for="sponsor in sponsorsWithPicture" :key="sponsor.id">
      <ThemedLink :href="sponsor.attributes.link">
        <VImg :src="sponsor.attributes.picture.data!.attributes.url" />
      </ThemedLink>
    </VCarouselItem>
  </VCarousel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getSponsors } from "@/api-client";
import { Sponsor } from "@/types";
import ThemedLink from "../ThemedLink.vue";
import { computed } from "vue";

const sponsors = ref<Sponsor[]>([]);

const sponsorsWithPicture = computed(() =>
  sponsors.value.filter((sponsor) => sponsor.attributes.picture.data)
);

onMounted(async () => {
  sponsors.value = await getSponsors();
});
</script>
