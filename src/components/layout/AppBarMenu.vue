<template>
  <VMenu open-on-hover>
    <template #activator="{ props }">
      <VBtn v-bind="props" append-icon="mdi-menu-down"
        ><template #prepend
          ><VIcon color="primary">{{ icon }}</VIcon></template
        >{{ title }}</VBtn
      >
    </template>
    <template #default>
      <VList>
        <VListItem
          v-for="child in children"
          :key="child.title"
          v-bind="child"
        />
      </VList>
    </template>
  </VMenu>
</template>

<script lang="ts" setup>
import { MenuLinkWithChildren } from "@/types";

defineProps<MenuLinkWithChildren>();
</script>
