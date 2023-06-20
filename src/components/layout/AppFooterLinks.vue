<template>
  <VRow dense>
    <VCol
      v-for="footerLink in footerLinks"
      :key="footerLink.id"
      :cols="12"
      :sm="12"
      :lg="6"
      :xl="3"
    >
      <VBtn
        variant="text"
        :href="getResolvedLink(footerLink)"
        :target="isLinkExternal(footerLink) ? '_blank' : null"
        size="small"
      >
        <template v-if="footerLink.icon" #prepend>
          <VIcon color="primary">{{ `mdi-${footerLink.icon}` }}</VIcon>
        </template>
        {{ footerLink.description }}
        <template v-if="isLinkExternal(footerLink)" #append>
          <VIcon color="primary">mdi-open-in-new</VIcon>
        </template>
      </VBtn></VCol
    >
  </VRow>
</template>

<script setup lang="ts">
import { getFooterLinks } from "@/api-client";
import { FooterLink } from "@/types";

const footerLinks = await getFooterLinks();

function isLinkExternal(footerLink: FooterLink) {
  return footerLink.link !== null;
}

function getResolvedLink(footerLink: FooterLink) {
  return (footerLink.file?.url || footerLink.link)!;
}
</script>
