<template>
  <TitleWithContent v-bind="gTeamPage" />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getGTeamPage } from "@/api-client";

const gTeamPage = await getGTeamPage();
</script>
