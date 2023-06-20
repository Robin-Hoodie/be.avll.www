<template>
  <VContainer>
    <VRow>
      <VCol :cols="cols" v-for="person in people" :key="person.id">
        <PersonDetails v-bind="person"
      /></VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { Person } from "@/types";
import PersonDetails from "@/components/person/PersonDetails.vue";

defineProps<{ people: Person[] }>();

const { smAndDown, lgAndDown } = useDisplay();

const cols = computed(() => {
  if (smAndDown.value) {
    return 12;
  }
  return lgAndDown.value ? 6 : 3;
});
</script>
