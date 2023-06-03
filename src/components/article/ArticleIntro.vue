<template>
  <v-card :title="title" :elevation="5" class="ma-2">
    <v-card-subtitle class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-icon color="primary" size="small">mdi-calendar</v-icon>
        <span class="pl-1">{{ dateCreatedFormatted }}</span>
      </div>
      <div v-if="location" class="d-flex align-center">
        <v-icon color="primary" size="small">mdi-map-marker-outline</v-icon>
        <span class="pl-1">{{ location }}</span>
      </div>
    </v-card-subtitle>
    <v-card-text>
      <vue-markdown
        :source="contentShortened"
        :options="{ breaks: true, linkify: true }"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn :to="linkArticle" color="primary">Lees meer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import VueMarkdown from "vue-markdown-render";
import { Article } from "@/types";
import { formatDateFull } from "@/utils";

const props = defineProps<Article>();

const CUTOFF_LENGTH = 200;

const contentShortened = computed(() => {
  if (props.content.length < CUTOFF_LENGTH) {
    return props.content.length;
  }
  return `${props.content.slice(0, CUTOFF_LENGTH - 3)}...`;
});

const dateCreatedFormatted = formatDateFull(props.publishedAt);

const linkArticle = `/artikels/${props.id}`;
</script>
