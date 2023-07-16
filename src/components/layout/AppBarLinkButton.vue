<template>
  <VBtn :to="to">
    <template #prepend>
      <VIcon color="primary">{{ icon }}</VIcon>
    </template>
    {{ title }}
  </VBtn>
</template>

<script lang="ts" setup>
import { MenuLinkWithoutChildren } from "@/types";

defineProps<MenuLinkWithoutChildren>();
</script>
