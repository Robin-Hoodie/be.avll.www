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
  <registration-form v-if="registrationPage" v-bind="registrationPage" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VueMarkdown from "vue-markdown-render";
import PageHeader from "@/components/PageHeader.vue";
import RegistrationForm from "@/components/registration/RegistrationForm.vue";
import { getRegistrationPage } from "@/api-client";

const registrationPage = ref(await getRegistrationPage());
</script>
