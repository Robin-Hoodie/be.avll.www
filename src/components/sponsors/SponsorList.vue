<template>
  <div class="sponsor-grid">
    <SponsorListItem
      v-for="sponsor in sponsors"
      v-bind="sponsor"
      :key="sponsor.id"
    />
  </div>
</template>

<script lang="ts" setup>
import { Sponsor } from "@/types";
import SponsorListItem from "./SponsorListItem.vue";

defineProps<{ sponsors: Sponsor[] }>();
</script>

<style>
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 450px);
  gap: 32px;
}
</style>
