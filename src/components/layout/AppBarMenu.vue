<template>
  <v-menu open-on-hover>
    <template #activator="{ props }">
      <v-btn v-bind="props" append-icon="mdi-menu-down"
        ><template #prepend
          ><v-icon color="primary">{{ icon }}</v-icon></template
        >{{ title }}</v-btn
      >
    </template>
    <template #default>
      <v-list>
        <v-list-item v-for="child in children" :key="child.to" v-bind="child" />
      </v-list>
    </template>
  </v-menu>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
  title: string;
  children: Array<{
    title: string;
    to: string;
  }>;
}>();
</script>
