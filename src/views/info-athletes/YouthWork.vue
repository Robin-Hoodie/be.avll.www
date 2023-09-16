<template>
  <TitleWithContent
    :title="youthWorkPage.title"
    :content="youthWorkPage.content"
  />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getYouthWorkPage } from "@/api-client";

const youthWorkPage = await getYouthWorkPage();
</script>
