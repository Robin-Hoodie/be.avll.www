<template>
  <article-full :article="article" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getBlogArticle } from "@/api-client";
import ArticleFull from "@/components/article/ArticleFull.vue";

const props = defineProps<{ id: string }>();

const article = ref(await getBlogArticle(props.id));
</script>
