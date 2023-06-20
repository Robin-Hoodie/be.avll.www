<template>
  <page-header>Bestuur</page-header>
  <person-details-list v-if="managementMembers" :people="managementMembers" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const managementMembers = await usePeople("management");
</script>
