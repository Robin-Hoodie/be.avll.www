<template>
  <page-header>Registratie</page-header>
  <vue-markdown
    v-if="registrationPage"
    :source="registrationPage.introText"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />

  <vue-markdown
    v-if="registrationPage"
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
import { RegistrationPage } from "@/types";
import RegistrationForm from "@/components/registration/RegistrationForm.vue";
import { useLoading } from "@/composables/useLoading";
import { getRegistrationPage } from "@/strapi";

const registrationPage = ref<RegistrationPage | null>(null);

useLoading(async () => (registrationPage.value = await getRegistrationPage()));
</script>
