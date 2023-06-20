<template>
  <VListItem :title="title" :to="to">
    <template #prepend>
      <VIcon color="primary">{{ icon }}</VIcon>
    </template>
  </VListItem>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  to: string;
  icon: string;
}>();
</script>
