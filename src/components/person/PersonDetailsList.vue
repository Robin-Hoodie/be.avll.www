<template>
  <VContainer>
    <VRow>
      <VCol :cols="cols" v-for="person in peopleSorted" :key="person.id">
        <PersonDetails
          :person="person"
          :is-prominent="getIsProminent(person)"
          :title="getTitle(person)"
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
    const personOneIsProminent = getIsProminent(person1);
    const personTwoIsProminent = getIsProminent(person2);
    if (personOneIsProminent) {
      return personTwoIsProminent ? 0 : -1;
    }
    return personTwoIsProminent ? 1 : 0;
  })
);

const { smAndDown, lgAndDown } = useDisplay();

const cols = computed(() => {
  if (smAndDown.value) {
    return 12;
  }
  return lgAndDown.value ? 6 : 3;
});

function getIsProminent(person: Person) {
  return person[
    `isProminentFor${props.activeRole[0].toUpperCase()}${props.activeRole.slice(
      1
    )}` as
      | "isProminentForManagement"
      | "isProminentForPartyManagement"
      | "isProminentForConfidant"
      | "isProminentForTrainerYouth"
      | "isProminentForTrainerFromCadet"
      | "isProminentForTrainerGTeam"
      | "isProminentForTrainerJoggers"
  ];
}

function getTitle(person: Person) {
  return person[
    `titleAs${props.activeRole[0].toUpperCase()}${props.activeRole.slice(
      1
    )}` as
      | "titleAsManagement"
      | "titleAsPartyManagement"
      | "titleAsConfidant"
      | "titleAsTrainerYouth"
      | "titleAsTrainerFromCadet"
      | "titleAsTrainerGTeam"
      | "titleAsTrainerJoggers"
  ];
}
</script>
