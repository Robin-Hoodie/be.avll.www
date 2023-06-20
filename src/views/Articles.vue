<template>
  <page-header>Artikels</page-header>
  <v-row>
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
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { getBlogArticles } from "@/api-client";
import ArticleIntro from "@/components/article/ArticleIntro.vue";
import PageHeader from "@/components/PageHeader.vue";

const blogArticles = await getBlogArticles();

const { mdAndDown, xxl } = useDisplay();

const cols = computed(() => {
  if (mdAndDown.value) {
    return 12;
  }
  return xxl.value ? 3 : 6;
});
</script>
