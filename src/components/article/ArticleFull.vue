<template>
  <PageHeader>{{ article.title }}</PageHeader>
  <VSheet class="pa-8" rounded :elevation="3">
    <article>
      <VImg
        v-if="article.coverPhoto"
        :src="article.coverPhoto.url"
        :width="article.coverPhoto.width"
        class="my-2"
      />
      <div
        v-if="article.location"
        class="text-subtitle-2 my-2 d-flex align-center"
      >
        <VIcon color="primary">mdi-map-marker-outline</VIcon>
        <span class="pl-1">{{ article.location }}</span>
      </div>
      <VueMarkdown
        :source="article.content"
        :options="{ breaks: true, linkify: true }"
        class="pb-4"
      />
      <div v-if="article.links" class="d-flex justify-end">
        <VBtn
          v-for="link in article.links"
          :key="link.id"
          :href="link.link"
          class="mx-2"
          variant="text"
        >
          {{ link.text }}</VBtn
        >
      </div>
    </article>
  </VSheet>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import { BlogArticle } from "@/types";
import PageHeader from "@/components/PageHeader.vue";

defineProps<{ article: BlogArticle }>();
</script>
