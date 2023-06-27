<template>
  <PageHeader>Resultaten</PageHeader>
  <TabsPerYear :list="results" v-slot="slotProps">
    <ResultTable :results="slotProps.listForYear" />
  </TabsPerYear>
</template>

<script lang="ts" setup>
import { getResults } from "@/api-client";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ResultTable from "@/components/result/ResultTable.vue";
import PageHeader from "@/components/PageHeader.vue";

const results = await getResults();
</script>
