<template>
  <VNavigationDrawer location="right">
    <div class="text-h6 font-weight-bold text-center mt-2">Sponsors</div>
    <VList>
      <VListItem v-for="sponsor in sponsors" :key="sponsor.id" class="my-1">
        <a :href="sponsor.link">
          <VImg :src="sponsor.picture.url" max-height="100" />
        </a>
      </VListItem>
    </VList>
    <VDivider />
    <div class="text-h6 font-weight-bold text-center my-2">Evenementen</div>
    <VList>
      <VListItem
        v-for="upcomingEvent in upcomingEvents"
        :key="upcomingEvent.id"
        class="mb-4"
      >
        <VListItemTitle
          class="font-weight-bold mb-1"
          :title="upcomingEvent.title"
        >
          {{ upcomingEvent.title }}
        </VListItemTitle>
        <VListItemSubtitle class="mb-2">
          <div class="d-flex align-center">
            <VIcon color="primary">mdi-clock</VIcon>
            <span class="ml-1">{{ formatDateFull(upcomingEvent.date) }}</span>
          </div>
          <div class="d-flex align-center">
            <VIcon color="primary">mdi-map-marker-outline</VIcon>
            <span class="ml-1">{{ upcomingEvent.location }}</span>
          </div>
        </VListItemSubtitle>

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
        <VListItemAction class="mt-2">
          <VBtn
            variant="outlined"
            color="primary"
            block
            :href="upcomingEvent.link"
          >
            {{ upcomingEvent.linkText }}
          </VBtn>
        </VListItemAction>
      </VListItem>
    </VList>
  </VNavigationDrawer>
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
