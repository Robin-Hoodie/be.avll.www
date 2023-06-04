<template>
  <v-app>
    <v-progress-linear
      v-if="isLoading"
      indeterminate
      color="primary"
      class="overlay-app-bar"
    />
    <app-bar />
    <app-side-bar />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import AppBar from "./layout/AppBar.vue";
import AppSideBar from "./layout/AppSideBar.vue";
import AppFooter from "./layout/AppFooter.vue";
import { setLoadingKey, unsetLoadingKey } from "@/providers/injection-keys";

const isLoading = ref(false);

function setLoading() {
  isLoading.value = true;
}

function unsetLoading() {
  isLoading.value = false;
}

provide(setLoadingKey, setLoading);
provide(unsetLoadingKey, unsetLoading);
</script>

<style scoped>
.overlay-app-bar {
  /* Higher than VAppBar */
  z-index: 2000;
}
</style>
