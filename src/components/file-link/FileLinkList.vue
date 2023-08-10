<template>
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

<script lang="ts" setup>
import { FileLink } from "@/types";

defineProps<{ fileLinks: FileLink[] }>();
</script>
