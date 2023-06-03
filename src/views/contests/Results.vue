<template>
  <tabs-per-year :list="results" v-slot="slotProps">
    <result-table :results="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Result } from "@/types";
import { getResults } from "@/strapi";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ResultTable from "@/components/result/ResultTable.vue";

const results = ref<Result[]>([]);

onMounted(async () => (results.value = await getResults()));
</script>