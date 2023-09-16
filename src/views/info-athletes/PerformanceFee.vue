<template>
  <TitleWithContent
    :title="performanceFeePage.title"
    :content="performanceFeePage.content"
  />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getPerformanceFeePage } from "@/api-client";

const performanceFeePage = await getPerformanceFeePage();
</script>
