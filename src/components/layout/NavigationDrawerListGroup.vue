<template>
  <VListGroup :value="value">
    <template #activator="{ props }">
      <VListItem v-bind="props" :title="title">
        <template #prepend>
          <VIcon color="primary">{{ icon }}</VIcon>
        </template>
      </VListItem>
    </template>
    <VListItem v-for="child in children" :key="child.title" v-bind="child" />
  </VListGroup>
</template>

<script lang="ts" setup>
import { MenuLinkWithChildren } from "@/types";

defineProps<MenuLinkWithChildren>();
</script>
