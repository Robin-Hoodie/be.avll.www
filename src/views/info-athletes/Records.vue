<template>
  <PageHeader>Records</PageHeader>
  <FileLinkList :file-links="recordsSorted" />
</template>

<script setup lang="ts">
import { getFileLinks } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";
import FileLinkList from "@/components/file-link/FileLinkList.vue";

const records = await getFileLinks(["record"]);

const recordsSorted = records
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
