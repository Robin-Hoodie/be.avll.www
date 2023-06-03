<template>
  <person-details-list :people="managementMembers" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getManagementMembers } from "@/strapi";
import { Person } from "@/types";
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";

const managementMembers = ref<Person[]>([]);

onMounted(async () => {
  managementMembers.value = await getManagementMembers();
});
</script>
