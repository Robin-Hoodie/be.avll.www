<template>
  <PageHeader>Records</PageHeader>
  <FileLinkList :file-links="records" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const records = await getFileLinks(["record"]);
</script>
