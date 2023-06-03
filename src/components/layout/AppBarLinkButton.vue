<template>
  <v-btn :to="to">
    <template #prepend>
      <v-icon color="primary">{{ icon }}</v-icon>
    </template>
    {{ title }}
  </v-btn>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  to: string;
  icon: string;
}>();
</script>
