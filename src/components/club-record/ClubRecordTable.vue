<template>
  <VTable>
    <thead>
      <tr>
        <th>Beschrijving</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="clubRecord in clubRecords" :key="clubRecord.id">
        <td>
          {{ clubRecord.description }}
        </td>
        <td>
          <a class="text-primary" :href="clubRecord.file.url">{{
            clubRecord.file.url
          }}</a>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { FileLink } from "@/types";

defineProps<{ clubRecords: FileLink[] }>();
</script>
