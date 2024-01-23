<template>
  <PageHeader v-if="dateFormatted"
    >Registratie Natuurlopen - {{ dateFormatted }}</PageHeader
  >
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
import dayjs from "dayjs";
import { formatDateFull } from "@/utils";
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import { getNatureRun, handleNatureRunRegistration } from "@/api-client";
import { NatureRun, NatureRunRegistration, WithRequired } from "@/types";

const natureRun = await getNatureRun();

const dateFormatted = natureRun
  ? formatDateFull(dayjs(natureRun.date).toDate())
  : null;

async function handleSubmit(natureRunRegistrationAndNatureRun: {
  natureRunRegistration: WithRequired<
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
