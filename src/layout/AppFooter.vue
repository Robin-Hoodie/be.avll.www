<template>
  <VFooter
    :elevation="4"
    class="pa-4 d-flex flex-column flex-wrap align-start"
    :style="maxHeight"
  >
    <suspense>
      <template #default>
        <AppFooterLinks />
      </template>
      <template #fallback>
        <CircularLoader />
      </template>
    </suspense>
  </VFooter>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import AppFooterLinks from "@/components/layout/AppFooterLinks.vue";
import { useDisplay } from "vuetify";
import CircularLoader from "@/components/CircularLoader.vue";

const { lgAndUp, xlAndUp } = useDisplay();

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
