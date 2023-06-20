<template>
  <VListGroup :value="value">
    <template #activator="{ props }">
      <VListItem v-bind="props" :title="title">
        <template #prepend>
          <VIcon color="primary">{{ icon }}</VIcon>
        </template>
      </VListItem>
    </template>
    <VListItem v-for="child in children" :key="child.to" v-bind="child" />
  </VListGroup>
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
