<template>
  <v-list-group :value="value">
    <template #activator="{ props }">
      <v-list-item v-bind="props" :title="title">
        <template #prepend>
          <v-icon color="primary">{{ icon }}</v-icon>
        </template>
      </v-list-item>
    </template>
    <v-list-item v-for="child in children" :key="child.to" v-bind="child" />
  </v-list-group>
</template>

<script lang="ts" setup>
defineProps<{
  value: string;
  icon: string;
  title: string;
  children: Array<{
    title: string;
    to: string;
  }>;
}>();
</script>
