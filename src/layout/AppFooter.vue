<template>
  <v-footer
    :elevation="4"
    class="pa-4 d-flex flex-column flex-wrap align-start"
    :style="maxHeight"
  >
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
  </v-footer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useLoading } from "@/composables/useLoading";
import { getFooterLinks } from "@/api-client";
import { FooterLink } from "@/types";
import { useDisplay } from "vuetify/lib/framework.mjs";

const footerLinks = ref<FooterLink[]>([]);

const { lgAndUp, xlAndUp } = useDisplay();

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

const maxHeight = computed(() => {
  if (xlAndUp.value) {
    return {
      maxHeight: "150px",
    };
  }
  if (lgAndUp.value) {
    return {
      maxHeight: "300px",
    };
  }
  return undefined;
});
</script>
