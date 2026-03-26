<template>
  <PageHeader v-if="natureRun">{{ natureRun.attributes.title }}</PageHeader>
  <RegistrationForm
    v-if="natureRun"
    v-bind="natureRun"
    @submit="handleSubmit"
  />
  <VueMarkdown
    v-else
    :source="noNatureRunMessage"
    :options="{ breaks: true, linkify: true, html: true }"
  />
</template>

<script setup lang="ts">
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import {getNatureRun, getNoNatureRunMessage, handleNatureRunRegistration} from "@/api-client";
import {NatureRunRegistrationRaw, WithRequired} from "@/types";
import VueMarkdown from "vue-markdown-render";

const natureRun = await getNatureRun();
let noNatureRunMessage = '';
if (!natureRun) {
  noNatureRunMessage = await getNoNatureRunMessage();
}

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
