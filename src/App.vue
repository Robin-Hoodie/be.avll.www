<template>
  <v-app>
    <app-bar />

    <v-main>
      <router-view />
    </v-main>

    <side-bar />
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "./layout/AppBar.vue";
import SideBar from "./layout/SideBar.vue";
</script>
