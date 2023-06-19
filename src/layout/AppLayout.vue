<template>
  <app-bar />
  <app-side-bar />

  <v-main>
    <v-container>
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <template #default>
              <component :is="Component" />
            </template>
            <template #fallback><app-loader /></template>
          </suspense>
        </template>
      </router-view>
    </v-container>
  </v-main>
  <app-footer />
</template>

<script lang="ts" setup>
import AppBar from "./AppBar.vue";
import AppSideBar from "./AppSideBar.vue";
import AppFooter from "./AppFooter.vue";
import AppLoader from "@/components/AppLoader.vue";
</script>

<style scoped>
.overlay-app-bar {
  /* Higher than VAppBar */
  z-index: 2000;
}
</style>
