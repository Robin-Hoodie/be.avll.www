<template>
  <TitleWithContent v-bind="recreationalClothingPage" />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getRecreationalClothingPage } from "@/api-client";

const recreationalClothingPage = await getRecreationalClothingPage();
</script>
