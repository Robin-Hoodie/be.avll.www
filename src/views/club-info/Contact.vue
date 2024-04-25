<template>
  <TitleWithContent v-bind="contactPage" />
</template>

<script lang="ts" setup>
import { getContactPage } from "@/api-client";
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";

const contactPage = await getContactPage();
</script>
