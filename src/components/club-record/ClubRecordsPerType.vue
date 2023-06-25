<template>
  <VTabs v-model="activeTab" align-tabs="center" center-active>
    <VTab
      v-for="clubRecordType in clubRecordTypes"
      :value="clubRecordType"
      :key="clubRecordType"
      color="primary"
    >
      {{ formatClubRecordType(clubRecordType) }}
    </VTab>
  </VTabs>
  <VWindow v-model="activeTab">
    <VWindowItem
      v-for="(clubRecordsForType, clubRecordType) in clubRecordsPerType"
      :key="clubRecordType"
      :value="clubRecordType"
    >
      <ClubRecordTable :club-records="clubRecordsForType" />
    </VWindowItem>
  </VWindow>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ClubRecord } from "@/types";
import ClubRecordTable from "./ClubRecordTable.vue";

const props = defineProps<{
  clubRecords: ClubRecord[];
}>();

function formatClubRecordType(type: ClubRecord["type"]) {
  return `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`;
}

const clubRecordTypes = new Set(
  props.clubRecords.map((clubRecord) => clubRecord.type)
);

const clubRecordsPerType = props.clubRecords.reduce<
  Record<ClubRecord["type"], ClubRecord[]>
>((clubRecordsPerTypeAcc, clubRecord) => {
  const clubRecordsForType = clubRecordsPerTypeAcc[clubRecord.type] || [];
  return {
    ...clubRecordsPerTypeAcc,
    [clubRecord.type]: clubRecordsForType.concat(clubRecord),
  };
}, {} as Record<ClubRecord["type"], ClubRecord[]>);

const activeTab = ref([...clubRecordTypes][0]);
</script>
