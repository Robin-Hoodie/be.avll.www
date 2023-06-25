<template>
  <PageHeader>Records</PageHeader>
  <ClubRecordsPerType :club-records="clubRecords" />
</template>

<script setup lang="ts">
import { getClubRecords } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import ClubRecordsPerType from "@/components/club-record/ClubRecordsPerType.vue";

const clubRecords = await getClubRecords();
</script>
