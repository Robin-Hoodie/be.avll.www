<template>
  <VCard :title="title" :elevation="5" class="ma-2">
    <VImg v-if="coverPhoto" :src="coverPhoto.url" class="my-2" :height="150" />
    <VCardSubtitle class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <VIcon color="primary" size="small">mdi-calendar</VIcon>
        <span class="pl-1">{{ dateCreatedFormatted }}</span>
      </div>
      <div v-if="location" class="d-flex align-center">
        <VIcon color="primary" size="small">mdi-map-marker-outline</VIcon>
        <span class="pl-1">{{ location }}</span>
      </div>
    </VCardSubtitle>
    <VCardText>
      <VueMarkdown
        :source="contentShortened"
        :options="{ breaks: true, linkify: true }"
      />
    </VCardText>
    <VCardActions>
      <VBtn :to="linkArticle" color="primary">Lees meer</VBtn>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import { Article } from "@/types";
import { formatDateFull } from "@/utils";

const props = defineProps<Article>();

const CUTOFF_LENGTH = 200;

const contentShortened =
  props.content.length < CUTOFF_LENGTH
    ? props.content
    : `${props.content.slice(0, CUTOFF_LENGTH - 3)}...`;

const dateCreatedFormatted = formatDateFull(props.publishedAt);

const linkArticle = `/artikels/${props.id}`;
</script>
