<template>
  <PageHeader>Feestbestuur</PageHeader>
  <PersonDetailsList
    :people="partyManagementMembers"
    active-role-name="partyManagement"
  />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const partyManagementMembers = await usePeople("partyManagement");
</script>
