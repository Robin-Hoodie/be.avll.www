<template>
  <v-footer
    :elevation="4"
    class="pa-4 d-flex flex-column flex-wrap align-start"
  >
    <v-row>
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
          class="my-1"
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
  </v-footer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useLoading } from "@/composables/useLoading";
import { getFooterLinks } from "@/strapi";
import { FooterLink } from "@/types";

const footerLinks = ref<FooterLink[]>([]);

useLoading(async () => {
  footerLinks.value = (await getFooterLinks()).filter(
    (footerLink) => footerLink.file !== null || footerLink.link !== null
  );
});

function isLinkExternal(footerLink: FooterLink) {
  return footerLink.link !== null;
}

function getResolvedLink(footerLink: FooterLink) {
  return (footerLink.file?.url || footerLink.link)!;
}
</script>
