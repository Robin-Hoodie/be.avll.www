<template>
  <v-footer :elevation="4">
    <div class="d-flex flex-column">
      <div class="text-subtitle-2 pl-4">Kalenders</div>
      <v-list v-if="calendarLinks">
        <v-list-item
          v-for="calendarLink in calendarLinks"
          :key="calendarLink.id"
        >
          <v-btn
            variant="text"
            :href="getResolvedLink(calendarLink)"
            size="small"
          >
            <template #prepend>
              <v-icon color="primary"> mdi-calendar </v-icon>
            </template>
            {{ calendarLink.description }}</v-btn
          >
        </v-list-item>
      </v-list>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { getCalendarLinks } from "@/strapi";
import { CalendarLink } from "@/types";

const calendarLinks = ref<CalendarLink[]>([]);

useLoading(async () => {
  calendarLinks.value = (await getCalendarLinks()).filter(
    (calendarLink) => calendarLink.file !== null || calendarLink.link !== null
  );
});

function getResolvedLink(calendarLink: CalendarLink) {
  return (calendarLink.file?.url || calendarLink.link)!;
}
</script>
