<template>
  <VContainer>
    <VRow>
      <VCol :cols="cols" v-for="person in peopleSorted" :key="person.id">
        <PersonDetails
          :person="person"
          :active-role="activeRole"
          :is-prominent="person.name === 'Simon Chovau'"
      /></VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import { Person, Role } from "@/types";
import PersonDetails from "@/components/person/PersonDetails.vue";

const props = defineProps<{ people: Person[]; activeRole: Role }>();

const peopleSorted = computed(() =>
  props.people.slice().sort((person1, person2) => {
    if (person1.isProminent) {
      return person2.isProminent ? 0 : -1;
    }
    return person2.isProminent ? 1 : 0;
  })
);

const { smAndDown, lgAndDown } = useDisplay();

const cols = computed(() => {
  if (smAndDown.value) {
    return 12;
  }
  return lgAndDown.value ? 6 : 3;
});
</script>
