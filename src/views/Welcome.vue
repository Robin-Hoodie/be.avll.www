<template>
  <ArticleFull hide-subtitle :article="welcomeArticle" />
</template>

<script lang="ts" setup>
import { getWelcomeArticle } from "@/api-client";
import ArticleFull from "@/components/article/ArticleFull.vue";

const welcomeArticle = await getWelcomeArticle();
</script>
