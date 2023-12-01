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

const props = defineProps<{
  natureRunRegistrationId: string;
}>();

await handleNatureRunRegistration({
  natureRunRegistrationId: Number(props.natureRunRegistrationId),
});
</script>
