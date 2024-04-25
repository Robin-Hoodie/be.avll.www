<template>
  <TitleWithContent
    v-bind="becomingAMemberPage"
  />
</template>

<script setup lang="ts">
import TitleWithContent from "@/components/title-with-content/TitleWithContent.vue";
import { getBecomingAMemberPage } from "@/api-client";

const becomingAMemberPage = await getBecomingAMemberPage();
</script>
