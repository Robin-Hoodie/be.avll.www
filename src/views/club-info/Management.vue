<template>
  <page-header>Bestuur</page-header>
  <person-details-list v-if="managementMembers" :people="managementMembers" />
</template>

<script setup lang="ts">
import { inject } from "vue";
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";
import PageHeader from "@/components/PageHeader.vue";
import { managementMembersKey } from "@/providers/injection-keys";
import { Person } from "@/types";

const managementMembers = inject<Person[]>(managementMembersKey);
</script>
