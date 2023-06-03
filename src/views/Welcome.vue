<template>
  <article-full v-if="welcomeArticle" hide-subtitle :article="welcomeArticle" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getWelcomeArticle } from "@/strapi";
import { Article } from "@/types";
import ArticleFull from "@/components/article/ArticleFull.vue";

const welcomeArticle = ref<Article | null>(null);

onMounted(async () => {
  welcomeArticle.value = await getWelcomeArticle();
});
</script>
