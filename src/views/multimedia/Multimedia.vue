<template>
  <PageHeader>Multimedia</PageHeader
  ><MultimediaLinkList :links="multiMediaLinks" />
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import { getMultimediaLinks } from "@/api-client/content";
import MultimediaLinkList from "@/components/MultimediaLinkList/MultimediaLinkList.vue";

const multiMediaLinks = await getMultimediaLinks();
</script>
