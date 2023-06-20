<template>
  <page-header>Registratie</page-header>
  <vue-markdown
    :source="registrationPage.introText"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />

  <vue-markdown
    :source="registrationPage.privacyStatement"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />
  <registration-form v-bind="registrationPage" />
</template>

<script lang="ts" setup>
import VueMarkdown from "vue-markdown-render";
import PageHeader from "@/components/PageHeader.vue";
import RegistrationForm from "@/components/registration/RegistrationForm.vue";
import { getRegistrationPage } from "@/api-client";

const registrationPage = await getRegistrationPage();
</script>
