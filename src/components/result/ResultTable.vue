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
        <td>{{ formatDateFull(result.attributes.date) }}</td>
        <td>{{ result.attributes.title }}</td>
        <td v-if="result.attributes.link">
          <ThemedLink
            :href="result.attributes.link"
            :external="result.attributes.link !== null"
            >{{ clipLink(result.attributes.link, 40) }}</ThemedLink
          >
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
