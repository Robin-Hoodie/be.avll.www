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
          {{ contest.attributes.title }}
        </td>
        <td>{{ formatDate(contest) }}</td>
        <td>
          {{ contest.attributes.location }}
        </td>
        <td>
          {{ formatDateFull(contest.attributes.dateFinalRegistration) }}
        </td>
        <td v-if="contest.attributes.infoLink">
          <ThemedLink :href="contest.attributes.infoLink" external
            >Info</ThemedLink
          >
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
  if (contest.attributes.dateEnd) {
    return `${formatDateFull(contest.attributes.dateStart)} - ${formatDateFull(
      contest.attributes.dateEnd
    )}`;
  }
  return formatDateFull(contest.attributes.dateStart);
}
</script>
