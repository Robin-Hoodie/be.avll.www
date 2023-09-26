<template>
  <PageHeader>Kalenders</PageHeader>
  <FileLinkList :file-links="calendars" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const calendars = await getFileLinks(["calendar"]);
</script>
