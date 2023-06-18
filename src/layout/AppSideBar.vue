<template>
  <v-navigation-drawer location="right">
    <div class="text-h6 font-weight-bold text-center mt-2">Sponsors</div>
    <v-list>
      <v-list-item v-for="sponsor in sponsors" :key="sponsor.id" class="my-1">
        <a :href="sponsor.link">
          <v-img :src="sponsor.picture.url" max-height="100" />
        </a>
      </v-list-item>
    </v-list>
    <v-divider />
    <div class="text-h6 font-weight-bold text-center my-2">Evenementen</div>
    <v-list>
      <v-list-item
        v-for="upcomingEvent in upcomingEvents"
        :key="upcomingEvent.id"
        class="mb-4"
      >
        <v-list-item-title
          class="font-weight-bold mb-1"
          :title="upcomingEvent.title"
        >
          {{ upcomingEvent.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="mb-2">
          <div class="d-flex align-center">
            <v-icon color="primary">mdi-clock</v-icon>
            <span class="ml-1">{{ formatDateFull(upcomingEvent.date) }}</span>
          </div>
          <div class="d-flex align-center">
            <v-icon color="primary">mdi-map-marker-outline</v-icon>
            <span class="ml-1">{{ upcomingEvent.location }}</span>
          </div>
        </v-list-item-subtitle>

        <div
          v-if="upcomingEvent.registrationFinalDate"
          class="text-body-2 mb-1"
        >
          Registratie tot
          {{ formatDateFull(upcomingEvent.registrationFinalDate) }}
        </div>
        <div v-if="upcomingEvent.registrationByClub" class="text-body-2">
          Registratie door club
        </div>
        <v-list-item-action class="mt-2">
          <v-btn
            variant="outlined"
            color="primary"
            block
            :href="upcomingEvent.link"
          >
            {{ upcomingEvent.linkText }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Sponsor, UpcomingEvent } from "@/types";
import { getSponsors, getUpcomingEvents } from "@/api-client";
import { formatDateFull } from "@/utils";

const sponsors = ref<Sponsor[]>([]);
const upcomingEvents = ref<UpcomingEvent[]>([]);

onMounted(async () => {
  sponsors.value = await getSponsors();
  upcomingEvents.value = await getUpcomingEvents();
});
</script>
