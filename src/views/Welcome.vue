<template>
  <article-full v-if="welcomeArticle" hide-subtitle :article="welcomeArticle" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getWelcomeArticle } from "@/api-client";
import { Article } from "@/types";
import ArticleFull from "@/components/article/ArticleFull.vue";
import { useLoading } from "@/composables/useLoading";

const welcomeArticle = ref<Article | null>(null);

useLoading(async () => (welcomeArticle.value = await getWelcomeArticle()));
</script>
