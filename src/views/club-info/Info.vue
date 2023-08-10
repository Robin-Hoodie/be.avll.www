<template>
  <PageHeader>Info</PageHeader>
  <FileLinkList :file-links="fileLinks" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import FileLinkList from "@/components/file-link/FileLinkList.vue";
import PageHeader from "@/components/PageHeader.vue";

const fileLinks = await getFileLinks([
  "secretariat",
  "sportAccident",
  "becomingAMember",
]);
</script>
