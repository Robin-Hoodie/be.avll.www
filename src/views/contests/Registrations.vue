<template>
  <PageHeader>Registratie</PageHeader>
  <VueMarkdown
    :source="registrationPage.introText"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />

  <VueMarkdown
    :source="registrationPage.privacyStatement"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />
  <RegistrationForm v-bind="registrationPage" />
</template>

<script lang="ts" setup>
import VueMarkdown from "vue-markdown-render";
import PageHeader from "@/components/PageHeader.vue";
import RegistrationForm from "@/components/registration/RegistrationForm.vue";
import { getRegistrationPage } from "@/api-client";

const registrationPage = await getRegistrationPage();
</script>
