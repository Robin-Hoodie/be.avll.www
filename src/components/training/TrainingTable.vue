<template>
  <v-table>
    <v-table>
      <thead>
        <tr>
          <th>Dag</th>
          <th>Van - tot</th>
          <th>Plaats</th>
          <th>Opmerkingen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="training in trainings" :key="training.id">
          <td>
            {{ training.day }}
          </td>
          <td>{{ formatStartEndTime(training) }}</td>
          <td>{{ training.place }}</td>
          <td>{{ training.comment }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-table>
</template>

<script lang="ts" setup>
import { Training } from "@/types";

defineProps<{ trainings: Training[] }>();

function formatStartEndTime(training: Training) {
  return `${training.startTime.slice(0, 5)} - ${training.endTime.slice(0, 5)}`;
}
</script>
