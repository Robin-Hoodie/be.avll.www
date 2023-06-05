<template>
  <v-footer :elevation="4" class="pa-4">
    <v-btn
      v-for="calendarLink in calendarLinks"
      :key="calendarLink.id"
      variant="text"
      :href="getResolvedLink(calendarLink)"
      :target="isLinkExternal(calendarLink) ? '_blank' : null"
      size="small"
      class="mx-1"
    >
      <template #prepend>
        <v-icon color="primary"> mdi-calendar </v-icon>
      </template>
      {{ calendarLink.description }}
      <template v-if="isLinkExternal(calendarLink)" #append>
        <v-icon color="primary">mdi-open-in-new</v-icon>
      </template>
    </v-btn>
    <v-btn
      v-if="blogLink"
      variant="text"
      :href="blogLink.link"
      target="_blank"
      size="small"
      external
      class="mx-1"
    >
      <template #prepend>
        <v-icon color="primary">mdi-post-outline</v-icon>
      </template>
      {{ blogLink.description }}
      <template #append>
        <v-icon color="primary">mdi-open-in-new</v-icon>
      </template>
    </v-btn>
  </v-footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { getCalendarLinks, getBlogLink } from "@/strapi";
import { CalendarLink, BlogLink } from "@/types";

const calendarLinks = ref<CalendarLink[]>([]);
const blogLink = ref<BlogLink | null>(null);

useLoading(async () => {
  calendarLinks.value = (await getCalendarLinks()).filter(
    (calendarLink) => calendarLink.file !== null || calendarLink.link !== null
  );
  blogLink.value = await getBlogLink();
});

function isLinkExternal(calendarLink: CalendarLink) {
  return calendarLink.link !== null;
}

function getResolvedLink(calendarLink: CalendarLink) {
  return (calendarLink.file?.url || calendarLink.link)!;
}
</script>
