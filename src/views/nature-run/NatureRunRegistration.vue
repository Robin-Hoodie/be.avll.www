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
import { NatureRun, NatureRunRegistration, WithRequired } from "@/types";

const natureRun = await getNatureRun();

async function handleSubmit(natureRunRegistrationAndNatureRun: {
  natureRunRegistrationRaw: WithRequired<
    NatureRunRegistration,
    "gender" | "distance" | "birthYear"
  >;
  natureRun: NatureRun;
}) {
  const checkoutUrl = await handleNatureRunRegistration(
    natureRunRegistrationAndNatureRun
  );

  window.location.assign(checkoutUrl);
}
</script>
