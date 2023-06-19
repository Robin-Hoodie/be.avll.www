<template>
  <page-header>Onze organisaties</page-header>
  <tabs-per-year :list="contests" v-slot="slotProps">
    <contest-table :contests="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getContests } from "@/api-client";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ContestTable from "@/components/contest/ContestTable.vue";
import PageHeader from "@/components/PageHeader.vue";

const contests = ref(await getContests());
</script>
