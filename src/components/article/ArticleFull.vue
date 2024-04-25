<template>
  <PageHeader>{{ article.attributes.title }}</PageHeader>
  <VSheet class="pa-8" rounded :elevation="3">
    <article>
      <VImg
        v-if="article.attributes.coverPhoto.data"
        :src="article.attributes.coverPhoto.data.attributes.url"
        :width="article.attributes.coverPhoto.data.attributes.width"
        class="my-2"
      />
      <div
        v-if="article.attributes.location"
        class="text-subtitle-2 my-2 d-flex align-center"
      >
        <VIcon color="primary">mdi-map-marker-outline</VIcon>
        <span class="pl-1">{{ article.attributes.location }}</span>
      </div>
      <VueMarkdown
        :source="article.attributes.content"
        :options="{ breaks: true, linkify: true }"
        class="pb-4"
      />
      <div v-if="article.attributes.links.data" class="d-flex justify-end">
        <VBtn
          v-for="link in article.attributes.links.data"
          :key="link.id"
          :href="link.attributes.link"
          class="mx-2"
          variant="text"
        >
          {{ link.attributes.text }}</VBtn
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
