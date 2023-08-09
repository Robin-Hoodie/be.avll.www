<template>
  <PageHeader>Bestuur</PageHeader>
  <PersonDetailsList :people="managementMembers" active-role="management" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const managementMembers = await usePeople("management");

console.log("managementMembers", managementMembers);
</script>
