<template>
  <TitleWithContent v-bind="sportingAccidentPage" />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getSportingAccidentPage } from "@/api-client";

const sportingAccidentPage = await getSportingAccidentPage();
</script>
