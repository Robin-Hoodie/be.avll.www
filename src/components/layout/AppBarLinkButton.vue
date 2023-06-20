<template>
  <VBtn :to="to">
    <template #prepend>
      <VIcon color="primary">{{ icon }}</VIcon>
    </template>
    {{ title }}
  </VBtn>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  to: string;
  icon: string;
}>();
</script>
