<template>
  <PageHeader>{{ attributes.title }}</PageHeader>
  <VueMarkdown
    :source="attributes.content"
    :options="{ breaks: true, linkify: true, html: true }"
  />
</template>

<script setup lang="ts">
import { TitleWithContent } from "@/types";
import PageHeader from "@/components/PageHeader.vue";
import VueMarkdown from "vue-markdown-render";

defineProps<TitleWithContent>();
</script>
