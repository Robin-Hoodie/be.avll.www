<template>
  <PageHeader>Piste Records</PageHeader>
  <FileLinkList :file-links="trackRecords" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const trackRecords = await getFileLinks(["trackRecord"]);
</script>
