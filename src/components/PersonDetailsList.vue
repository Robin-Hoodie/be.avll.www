<template>
  <v-container>
    <v-row>
      <v-col :cols="cols" v-for="person in people" :key="person.id">
        <person-details v-bind="person"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { Person } from "@/types";
import PersonDetails from "@/components/PersonDetails.vue";

defineProps<{ people: Person[] }>();

const { smAndDown, lgAndDown } = useDisplay();

const cols = computed(() => {
  if (smAndDown.value) {
    return 12;
  }
  return lgAndDown.value ? 6 : 3;
});
</script>
