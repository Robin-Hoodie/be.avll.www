<template>
  <page-header>Officiëlen</page-header>
  <person-details-list :people="officials" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { usePeople } from "@/composables/usePeople";

const officials = await usePeople("official");
</script>
