<template>
  <VTable>
    <thead>
      <tr>
        <th>Datum</th>
        <th>Wedstrijd</th>
        <th>Uitslag</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="result in results" :key="result.id">
        <td>{{ formatDateFull(result.date) }}</td>
        <td>{{ result.title }}</td>
        <td v-if="result.link">
          <ThemedLink :href="result.link" :external="result.link !== null">{{
            clipLink(result.link, 40)
          }}</ThemedLink>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { Result } from "@/types";
import { formatDateFull, clipLink } from "@/utils";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{ results: Result[] }>();
</script>
