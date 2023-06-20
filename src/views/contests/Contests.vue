<template>
  <PageHeader>Onze organisaties</PageHeader>
  <TabsPerYear :list="contests" v-slot="slotProps">
    <ContestTable :contests="slotProps.listForYear" />
  </TabsPerYear>
</template>

<script lang="ts" setup>
import { getContests } from "@/api-client";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ContestTable from "@/components/contest/ContestTable.vue";
import PageHeader from "@/components/PageHeader.vue";

const contests = await getContests();
</script>
