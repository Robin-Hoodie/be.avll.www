<template>
  <ArticleFull hide-subtitle :article="welcomeArticle" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getWelcomeArticle } from "@/api-client";
import ArticleFull from "@/components/article/ArticleFull.vue";

const welcomeArticle = ref(await getWelcomeArticle());
</script>
