<template>
  <page-header>Feestbestuur</page-header>
  <person-details-list :people="partyManagementMembers" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const partyManagementMembers = await usePeople("partyManagement");
</script>
