<template>
  <v-app>
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
import AppBar from "./layout/AppBar.vue";
import AppSideBar from "./layout/AppSideBar.vue";
import AppFooter from "./layout/AppFooter.vue";
</script>
