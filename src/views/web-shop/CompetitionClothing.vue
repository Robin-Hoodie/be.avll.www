<template>
  <TitleWithContent v-bind="competitionClothingPage" />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getCompetitionClothingPage } from "@/api-client";

const competitionClothingPage = await getCompetitionClothingPage();
</script>
