<template>
  <v-sheet class="ma-16 pa-8" rounded :elevation="3">
    <article>
      <h1>{{ article.title }}</h1>
      <v-img
        v-if="article.coverPhoto"
        :src="article.coverPhoto.url"
        :width="article.coverPhoto.width"
        class="my-2"
      />
      <div v-if="!hideSubtitle" class="text-subtitle-2 my-2">
        <div class="d-flex align-center">
          <v-icon color="primary">mdi-clock</v-icon>
          <span class="pl-1">{{ dateFormatted }}</span>
        </div>
        <div v-if="article.location" class="d-flex align-center">
          <v-icon color="primary">mdi-map-marker-outline</v-icon>
          <span class="pl-1">{{ article.location }}</span>
        </div>
      </div>
      <vue-markdown
        :source="article.content"
        :options="{ breaks: true, linkify: true }"
      />
    </article>
  </v-sheet>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import { Article } from "@/types";
import { formatDateFull } from "@/utils";

const props = withDefaults(
  defineProps<{ article: Article; hideSubtitle?: boolean }>(),
  {
    hideSubtitle: false,
  }
);

const dateFormatted = formatDateFull(props.article.publishedAt);
</script>
