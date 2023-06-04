<template>
  <v-table>
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
        <td>
          <themed-link :href="result.link" external>{{
            result.link
          }}</themed-link>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { Result } from "@/types";
import { formatDateFull } from "@/utils";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{ results: Result[] }>();
</script>
