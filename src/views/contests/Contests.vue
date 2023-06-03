<template>
  <tabs-per-year :list="contests" v-slot="slotProps">
    <contest-table :contests="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { getContests } from "@/strapi";
import { Contest } from "@/types";
import { onMounted, ref } from "vue";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ContestTable from "@/components/contest/ContestTable.vue";

const contests = ref<Contest[]>([]);

onMounted(async () => (contests.value = await getContests()));
</script>
