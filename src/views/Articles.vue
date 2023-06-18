<template>
  <page-header>Artikels</page-header>
  <v-row v-if="blogArticles">
    <v-col
      :cols="cols"
      v-for="blogArticle in blogArticles"
      :key="blogArticle.id"
    >
      <article-intro v-bind="blogArticle" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { getBlogArticles } from "@/api-client";
import ArticleIntro from "@/components/article/ArticleIntro.vue";
import PageHeader from "@/components/PageHeader.vue";
import { useLoading } from "@/composables/useLoading";
import { Article } from "@/types";

const blogArticles = ref<Article[] | null>(null);

useLoading(async () => (blogArticles.value = await getBlogArticles()));

const { mdAndDown, xxl } = useDisplay();

const cols = computed(() => {
  if (mdAndDown.value) {
    return 12;
  }
  return xxl.value ? 3 : 6;
});
</script>
