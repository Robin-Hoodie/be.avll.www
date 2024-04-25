<template>
  <VList>
    <VListItem v-for="fileLink in fileLinksSorted" :key="fileLink.id">
      <!-- Filter function in script checks for existing data prop -->
      <VBtn
        variant="text"
        :href="fileLink.attributes.file.data!.attributes.url"
      >
        <template #prepend>
          <VIcon color="primary">mdi-post</VIcon>
        </template>
        {{ fileLink.attributes.description }}
      </VBtn>
    </VListItem>
  </VList>
</template>

<script lang="ts" setup>
import { FileLink } from "@/types";

const props = defineProps<{ fileLinks: FileLink[] }>();

const fileLinksSorted = props.fileLinks
  .slice()
  .filter((fileLink) => fileLink.attributes.file.data)
  .sort(
    (
      { attributes: { sortPriority: sortPriorityOne } },
      { attributes: { sortPriority: sortPriorityTwo } }
    ) => {
      if (typeof sortPriorityOne === "number") {
        return typeof sortPriorityTwo === "number"
          ? sortPriorityTwo - sortPriorityOne
          : -1;
      }
      return typeof sortPriorityTwo === "number" ? 1 : 0;
    }
  );
</script>
