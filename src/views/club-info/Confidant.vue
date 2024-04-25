<template>
  <TitleWithContent v-bind="confidantPage" />
  <PersonDetailsList :people="confidants" active-role-name="confidant" />
</template>

<script setup lang="ts">
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import { usePeople } from "@/composables/usePeople";
import { getConfidantPage } from "@/api-client";
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";

const confidantPage = await getConfidantPage();
const confidants = await usePeople("confidant");
</script>
