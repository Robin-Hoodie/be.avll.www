<template>
  <v-list-item :title="title" :to="to">
    <template #prepend>
      <v-icon color="primary">{{ icon }}</v-icon>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  to: string;
  icon: string;
}>();
</script>
