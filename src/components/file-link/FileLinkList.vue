<template>
  <VList>
    <VListItem v-for="fileLink in fileLinksSorted" :key="fileLink.id">
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

const props = defineProps<{ fileLinks: FileLink[] }>();

const fileLinksSorted = props.fileLinks
  .slice()
  .sort(
    ({ sortPriority: sortPriorityOne }, { sortPriority: sortPriorityTwo }) => {
      if (typeof sortPriorityOne === "number") {
        return typeof sortPriorityTwo === "number"
          ? sortPriorityTwo - sortPriorityOne
          : -1;
      }
      return typeof sortPriorityTwo === "number" ? 1 : 0;
    }
  );
</script>
