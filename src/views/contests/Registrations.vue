<template>
  <PageHeader>Inschrijvingen</PageHeader>
  <VueMarkdown
    :source="registrationPage.attributes.introText"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />

  <VueMarkdown
    :source="registrationPage.attributes.privacyStatement"
    :options="{ break: true, linkify: true }"
    class="text-body-1 mb-2"
  />
  <RegistrationContestTable
    v-if="registrationContests.length > 0"
    :registration-contests="registrationContests"
    class="mb-2"
  />
  <RegistrationForm v-bind="registrationPage" />
</template>

<script lang="ts" setup>
import VueMarkdown from "vue-markdown-render";
import PageHeader from "@/components/PageHeader.vue";
import RegistrationForm from "@/components/registration/RegistrationForm.vue";
import RegistrationContestTable from "@/components/registration/RegistrationContestTable.vue";
import { getRegistrationPage, getRegistrationContests } from "@/api-client";

const registrationPage = await getRegistrationPage();
const registrationContests = await getRegistrationContests();
</script>
