<template>
  <PageHeader>Registratie succesvol</PageHeader>
  <div>
    U bent geregistreerd voor de wedstrijd. U ontvangt nog een bevestiging via
    email.
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { handleNatureRunRegistration } from "@/api-client";
import { NATURE_RUN_LOCAL_STORAGE_KEY } from "@/utils";

await handleNatureRunRegistration(
  JSON.parse(localStorage.getItem(NATURE_RUN_LOCAL_STORAGE_KEY)!)
);
localStorage.removeItem(NATURE_RUN_LOCAL_STORAGE_KEY);
</script>
