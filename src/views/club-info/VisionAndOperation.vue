<template>
  <PageHeader>Visie en werking</PageHeader>
  <VList>
    <VListItem v-for="fileLink in fileLinks" :key="fileLink.id">
      <VBtn variant="text" :href="fileLink.file.url">
        <template #prepend>
          <VIcon color="primary">mdi-post</VIcon>
        </template>
        {{ fileLink.description }}
      </VBtn>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { getFileLinks } from "@/api-client/content";

const fileLinks = await getFileLinks([
  "philosophy",
  "missionStatement",
  "statutes",
]);
</script>
