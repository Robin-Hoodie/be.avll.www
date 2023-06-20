<template>
  <article-full :article="article" />
</template>

<script setup lang="ts">
import { getBlogArticle } from "@/api-client";
import ArticleFull from "@/components/article/ArticleFull.vue";

const props = defineProps<{ id: string }>();

const article = await getBlogArticle(props.id);
</script>
