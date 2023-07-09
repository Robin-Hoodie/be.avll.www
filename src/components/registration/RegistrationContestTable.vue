<template>
  <VTable>
    <thead>
      <tr>
        <th>Wedstrijd</th>
        <th>Datum(s)</th>
        <th>Waar</th>
        <th>Uiterste inschrijfdatum</th>
        <th>Infolink</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contest in registrationContests" :key="contest.id">
        <td>
          {{ contest.title }}
        </td>
        <td>{{ formatDate(contest) }}</td>
        <td>
          {{ contest.location }}
        </td>
        <td>
          {{ formatDateFull(contest.dateFinalRegistration) }}
        </td>
        <td v-if="contest.infoLink">
          <ThemedLink :href="contest.infoLink" external>Info</ThemedLink>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { RegistrationContest } from "@/types";
import { formatDateFull } from "@/utils";
import ThemedLink from "../ThemedLink.vue";

defineProps<{ registrationContests: RegistrationContest[] }>();

function formatDate(contest: RegistrationContest) {
  if (contest.dateEnd) {
    return `${formatDateFull(contest.dateStart)} - ${formatDateFull(
      contest.dateEnd
    )}`;
  }
  return formatDateFull(contest.dateStart);
}
</script>
