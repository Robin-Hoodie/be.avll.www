<template>
  <VTable>
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
          {{ training.attributes.day }}
        </td>
        <td>{{ formatStartEndTime(training) }}</td>
        <td>{{ training.attributes.place }}</td>
        <td>{{ training.attributes.comment }}</td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { Training } from "@/types";

defineProps<{ trainings: Training[] }>();

function formatStartEndTime(training: Training) {
  return `${training.attributes.startTime.slice(
    0,
    5
  )} - ${training.attributes.endTime.slice(0, 5)}`;
}
</script>
