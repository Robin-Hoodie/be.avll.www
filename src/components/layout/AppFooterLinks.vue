<template>
  <v-row dense>
    <v-col
      v-for="footerLink in footerLinks"
      :key="footerLink.id"
      :cols="12"
      :sm="12"
      :lg="6"
      :xl="3"
    >
      <v-btn
        variant="text"
        :href="getResolvedLink(footerLink)"
        :target="isLinkExternal(footerLink) ? '_blank' : null"
        size="small"
      >
        <template v-if="footerLink.icon" #prepend>
          <v-icon color="primary">{{ `mdi-${footerLink.icon}` }}</v-icon>
        </template>
        {{ footerLink.description }}
        <template v-if="isLinkExternal(footerLink)" #append>
          <v-icon color="primary">mdi-open-in-new</v-icon>
        </template>
      </v-btn></v-col
    >
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getFooterLinks } from "@/api-client";
import { FooterLink } from "@/types";

const footerLinks = ref(await getFooterLinks());

function isLinkExternal(footerLink: FooterLink) {
  return footerLink.link !== null;
}

function getResolvedLink(footerLink: FooterLink) {
  return (footerLink.file?.url || footerLink.link)!;
}
</script>
