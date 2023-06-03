<template>
  <contest-table :contests="contests" />
</template>

<script lang="ts" setup>
import { getContests } from "@/strapi";
import { Contest } from "@/types";
import { onMounted, ref } from "vue";
import ContestTable from "@/components/ContestTable.vue";

const contests = ref<Contest[]>([]);

onMounted(async () => (contests.value = await getContests()));
</script>
