<template>
  <VListItem :title="title" :to="to">
    <template #prepend>
      <VIcon color="primary">{{ icon }}</VIcon>
    </template>
  </VListItem>
</template>

<script lang="ts" setup>
import { MenuLinkWithoutChildren } from "@/types";

defineProps<MenuLinkWithoutChildren>();
</script>
