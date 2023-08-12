<template>
  <AppBar />
  <AppSideBar />

  <VMain>
    <VContainer>
      <VImg
        v-if="coverPhotoUrl"
        :src="coverPhotoUrl"
        class="ma-2"
        max-height="350"
      />
      <VDivider v-if="coverPhotoUrl" />
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <template #default>
              <component :is="Component" />
            </template>
            <template #fallback><CircularLoader size="large" /></template>
          </suspense>
        </template>
      </RouterView>
    </VContainer>
  </VMain>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AppBar from "./AppBar.vue";
import AppSideBar from "./AppSideBar.vue";
import CircularLoader from "@/components/CircularLoader.vue";
import { onMounted } from "vue";
import { getCoverPhotoUrl } from "@/api-client";

const coverPhotoUrl = ref<string | null>(null);

onMounted(async () => {
  coverPhotoUrl.value = await getCoverPhotoUrl();
});
</script>

<style scoped>
.overlay-app-bar {
  /* Higher than VAppBar */
  z-index: 2000;
}
</style>
