<template>
  <TitleWithContent
    :title="contestRegistrationInstructionsPage.title"
    :content="contestRegistrationInstructionsPage.content"
  />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getContestRegistrationInstructionsPage } from "@/api-client";

const contestRegistrationInstructionsPage =
  await getContestRegistrationInstructionsPage();
</script>
