<template>
  <page-header>Bestuur</page-header>
  <person-details-list v-if="managementMembers" :people="managementMembers" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getManagementMembers } from "@/strapi";
import { Person } from "@/types";
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import { useLoading } from "@/composables/useLoading";
import PageHeader from "@/components/PageHeader.vue";

const managementMembers = ref<Person[] | null>(null);

useLoading(
  async () => (managementMembers.value = await getManagementMembers())
);
</script>
