<template>
  <page-header>Onze organisaties</page-header>
  <tabs-per-year v-if="contests" :list="contests" v-slot="slotProps">
    <contest-table :contests="slotProps.listForYear" />
  </tabs-per-year>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getContests } from "@/api-client";
import { Contest } from "@/types";
import TabsPerYear from "@/components/TabsPerYear.vue";
import ContestTable from "@/components/contest/ContestTable.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useLoading } from "@/composables/useLoading";

const contests = ref<Contest[] | null>(null);

useLoading(async () => (contests.value = await getContests()));
</script>
