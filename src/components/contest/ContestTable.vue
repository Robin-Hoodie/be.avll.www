<template>
  <VTable>
    <thead>
      <tr>
        <th>Datum</th>
        <th>Wedstrijd</th>
        <th>Registratie</th>
        <th>Schema</th>
        <th>Website</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contest in contests" :key="contest.id">
        <td>{{ formatDateFull(contest.date) }}</td>
        <td>{{ contest.title }}</td>
        <td>
          <ThemedLink
            v-if="contest.registrationLink"
            :href="contest.registrationLink"
            external
          >
            Aanmelden
          </ThemedLink>
        </td>
        <td>
          <ThemedLink
            v-if="contest.scheduleLink"
            :href="contest.scheduleLink"
            external
          >
            Schema
          </ThemedLink>
        </td>
        <td>
          <ThemedLink
            v-if="contest.websiteLink"
            :href="contest.websiteLink"
            external
          >
            Website
          </ThemedLink>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { Contest } from "@/types";
import { formatDateFull } from "@/utils";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{ contests: Contest[] }>();
</script>
