<template>
  <PageHeader>Artikels</PageHeader>
  <VRow>
    <VCol
      :cols="cols"
      v-for="blogArticle in blogArticles"
      :key="blogArticle.id"
    >
      <ArticleIntro v-bind="blogArticle" />
    </VCol>
  </VRow>
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
