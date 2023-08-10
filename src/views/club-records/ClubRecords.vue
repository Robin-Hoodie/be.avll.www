<template>
  <PageHeader>Records</PageHeader>
  <ClubRecordTable :club-records="clubRecords" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import ClubRecordTable from "@/components/club-record/ClubRecordTable.vue";

const clubRecords = await getFileLinks(["clubRecord"]);
</script>
