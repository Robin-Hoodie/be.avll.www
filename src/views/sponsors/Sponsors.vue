<template>
  <PageHeader>Sponsors</PageHeader>
  <SponsorList :sponsors="sponsors" />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import SponsorList from "@/components/sponsors/SponsorList.vue";
import { getSponsors } from "@/api-client";

const sponsors = await getSponsors();
</script>
