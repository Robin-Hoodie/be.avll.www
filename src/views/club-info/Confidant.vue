<template>
  <PageHeader>Vertrouwenspersoon</PageHeader>
  <PersonDetailsList :people="confidants" active-role="confidant" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const confidants = await usePeople("confidant");
</script>
