<template>
  <PageHeader>Club Records</PageHeader>
  <FileLinkList :file-links="clubRecords" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const clubRecords = await getFileLinks(["clubRecord"]);
</script>
