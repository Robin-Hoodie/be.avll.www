<template>
  <tabs-per-year v-if="results" :list="results" v-slot="slotProps">
    <result-table :results="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Result } from "@/types";
import { getResults } from "@/strapi";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ResultTable from "@/components/result/ResultTable.vue";
import { useLoading } from "@/composables/useLoading";

const results = ref<Result[] | null>(null);

useLoading(async () => (results.value = await getResults()));
</script>
