<template>
  <article-full v-if="article" :article="article" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getBlogArticle } from "@/strapi";
import { Article } from "@/types";
import ArticleFull from "@/components/ArticleFull.vue";

const route = useRoute();
const article = ref<Article | null>(null);

onMounted(async () => {
  article.value = await getBlogArticle(route.params.id as string);
});
</script>
