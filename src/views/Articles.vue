<template>
  <v-container>
    <v-row>
      <v-col
        :cols="cols"
        v-for="blogArticle in blogArticles"
        :key="blogArticle.id"
      >
        <article-intro v-bind="blogArticle" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { getBlogArticles } from "@/strapi";
import { Article } from "@/types";
import ArticleIntro from "@/components/ArticleIntro.vue";

const blogArticles = ref<Article[]>([]);

onMounted(async () => (blogArticles.value = await getBlogArticles()));

const { mdAndDown, xxl } = useDisplay();

const cols = computed(() => {
  if (mdAndDown.value) {
    return 12;
  }
  return xxl.value ? 3 : 6;
});
</script>
