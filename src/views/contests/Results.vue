<template>
  <page-header>Resultaten</page-header>
  <tabs-per-year v-if="results" :list="results" v-slot="slotProps">
    <result-table :results="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Result } from "@/types";
import { getResults } from "@/api-client";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ResultTable from "@/components/result/ResultTable.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useLoading } from "@/composables/useLoading";

const results = ref<Result[] | null>(null);

useLoading(async () => (results.value = await getResults()));
</script>
