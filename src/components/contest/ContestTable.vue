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
        <td>{{ formatDateFull(contest.attributes.date) }}</td>
        <td>{{ contest.attributes.title }}</td>
        <td>
          <ThemedLink
            v-if="contest.attributes.registrationLink"
            :href="contest.attributes.registrationLink"
            external
          >
            {{ clipLink(contest.attributes.registrationLink, 30) }}
          </ThemedLink>
        </td>
        <td>
          <ThemedLink
            v-if="contest.attributes.scheduleLink"
            :href="contest.attributes.scheduleLink"
            external
          >
            {{ clipLink(contest.attributes.scheduleLink, 30) }}
          </ThemedLink>
        </td>
        <td>
          <ThemedLink
            v-if="contest.attributes.websiteLink"
            :href="contest.attributes.websiteLink"
            external
          >
            {{ clipLink(contest.attributes.websiteLink, 30) }}
          </ThemedLink>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { Contest } from "@/types";
import { formatDateFull, clipLink } from "@/utils";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{ contests: Contest[] }>();
</script>
