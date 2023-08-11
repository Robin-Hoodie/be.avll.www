<template>
  <TitleWithContent :title="welcomePage.title" :content="welcomePage.content" />
</template>

<script lang="ts" setup>
import { getWelcomePage } from "@/api-client";
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";

const welcomePage = await getWelcomePage();
</script>
