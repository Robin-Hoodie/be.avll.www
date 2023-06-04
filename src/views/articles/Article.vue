<template>
  <article-full v-if="article" :article="article" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getBlogArticle } from "@/strapi";
import { Article } from "@/types";
import ArticleFull from "@/components/article/ArticleFull.vue";
import { useLoading } from "@/composables/useLoading";

const props = defineProps<{ id: string }>();
const article = ref<Article | null>(null);

useLoading(async () => (article.value = await getBlogArticle(props.id)));
</script>
