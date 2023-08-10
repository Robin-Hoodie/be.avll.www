<template>
  <AppBar />
  <AppSideBar />

  <VMain>
    <VContainer>
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
import AppBar from "./AppBar.vue";
import AppSideBar from "./AppSideBar.vue";
import CircularLoader from "@/components/CircularLoader.vue";
</script>

<style scoped>
.overlay-app-bar {
  /* Higher than VAppBar */
  z-index: 2000;
}
</style>
