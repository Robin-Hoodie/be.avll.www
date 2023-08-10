<template>
  <PageHeader>Visie en werking</PageHeader>
  <FileLinkList :file-links="fileLinks" />
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { getFileLinks } from "@/api-client/content";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const fileLinks = await getFileLinks([
  "philosophy",
  "vision",
  "houseRules",
]);
</script>
