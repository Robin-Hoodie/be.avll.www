<template>
  <PageHeader v-if="natureRun">{{ natureRun.attributes.title }}</PageHeader>
  <RegistrationForm
    v-if="natureRun"
    v-bind="natureRun"
    @submit="handleSubmit"
  />
  <div v-else>
    Er is momenteel geen natuurloop waar u zich voor kan registreren
  </div>
</template>

<script setup lang="ts">
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import { getNatureRun, handleNatureRunRegistration } from "@/api-client";
import { NatureRunRegistrationRaw, WithRequired } from "@/types";

const natureRun = await getNatureRun();

async function handleSubmit(
  natureRunRegistrationRaw: WithRequired<
    NatureRunRegistrationRaw,
    "gender" | "distance" | "birthYear"
  >
) {
  const checkoutUrl = await handleNatureRunRegistration(
    natureRunRegistrationRaw
  );

  window.location.assign(checkoutUrl);
}
</script>
