<template>
  <VNavigationDrawer :location="smAndDown ? 'bottom' : 'right'" permanent>
    <div class="text-h6 font-weight-bold text-center mt-2">Sponsors</div>
    <SponsorAnimation class="ma-2" />
    <template v-if="upcomingContests.length > 0">
      <VDivider />
      <div class="text-h6 font-weight-bold text-center my-2">Evenementen</div>
      <VList>
        <VListItem
          v-for="upcomingContest in upcomingContests"
          :key="upcomingContest.id"
          class="mb-4"
        >
          <VListItemTitle
            class="font-weight-bold mb-1"
            :title="upcomingContest.title"
          >
            {{ upcomingContest.title }}
          </VListItemTitle>
          <VListItemSubtitle class="mb-2">
            <div class="d-flex align-center">
              <VIcon color="primary">mdi-clock</VIcon>
              <span class="ml-1">{{
                formatDateFull(upcomingContest.date)
              }}</span>
            </div>
            <div class="d-flex align-center">
              <VIcon color="primary">mdi-map-marker-outline</VIcon>
              <span class="ml-1">{{ upcomingContest.location }}</span>
            </div>
          </VListItemSubtitle>

          <div
            v-if="upcomingContest.dateFinalRegistration"
            class="text-body-2 mb-1"
          >
            Registratie tot
            {{ formatDateFull(upcomingContest.dateFinalRegistration) }}
          </div>
          <div v-if="upcomingContest.registrationByClub" class="text-body-2">
            Registratie door club
          </div>
          <VBtn
            variant="outlined"
            color="primary"
            block
            :href="upcomingContest.primaryLink"
            class="mt-2"
          >
            {{ upcomingContest.primaryLinkText }}
          </VBtn>
          <VBtn
            v-if="upcomingContest.secondaryLink"
            variant="outlined"
            color="primary"
            block
            :href="upcomingContest.secondaryLink"
            class="mt-2"
          >
            {{ upcomingContest.secondaryLinkText }}
          </VBtn>
        </VListItem>
      </VList>
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import { onMounted } from "vue";
import { getUpcomingContests } from "@/api-client";
import { formatDateFull } from "@/utils";
import SponsorAnimation from "@/components/sponsors/SponsorAnimation.vue";
import { ref } from "vue";
import { UpcomingContest } from "@/types";

const upcomingContests = ref<UpcomingContest[]>([]);

const { smAndDown } = useDisplay();

onMounted(async () => {
  upcomingContests.value = await getUpcomingContests();
});
</script>
