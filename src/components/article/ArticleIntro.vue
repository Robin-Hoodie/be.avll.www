<template>
  <VCard :title="title" :elevation="5" class="ma-2">
    <VImg v-if="coverPhoto" :src="coverPhoto.url" class="my-2" :height="150" />
    <VCardSubtitle v-if="location" class="d-flex align-center">
      <VIcon color="primary" size="small">mdi-map-marker-outline</VIcon>
      <span class="pl-1">{{ location }}</span>
    </VCardSubtitle>
    <VCardText>
      <VueMarkdown
        :source="contentShortened"
        :options="{ breaks: true, linkify: true }"
      />
    </VCardText>
    <VCardActions>
      <div class="d-flex justify-space-between w-100">
        <VBtn :to="linkArticle" color="primary">Lees meer</VBtn>
        <div v-if="links">
          <VBtn v-for="link in links" :key="link.id" :href="link.link">
            {{ link.text }}</VBtn
          >
        </div>
      </div>
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import VueMarkdown from "vue-markdown-render";
import { BlogArticle } from "@/types";

const props = defineProps<BlogArticle>();

const CUTOFF_LENGTH = 200;

const contentShortened =
  props.content.length < CUTOFF_LENGTH
    ? props.content
    : `${props.content.slice(0, CUTOFF_LENGTH - 3)}...`;

const linkArticle = `/artikels/${props.id}`;
</script>
