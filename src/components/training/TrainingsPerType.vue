<template>
  <VTabs v-model="activeTab" align-tabs="center" center-active>
    <VTab
      v-for="trainingType in trainingTypes"
      :value="trainingType"
      :key="trainingType"
      color="primary"
    >
      {{ formatTrainingType(trainingType) }}
    </VTab>
  </VTabs>
  <VWindow v-model="activeTab">
    <VWindowItem
      v-for="(
        trainingsWithIntroForType, trainingType
      ) in trainingsWithIntroPerType"
      :key="trainingType"
      :value="trainingType"
    >
      <VueMarkdown
        :source="trainingsWithIntroForType.intro"
        :options="{ breaks: true, linkify: true }"
        class="my-2"
      />
      <TrainingTable :trainings="trainingsWithIntroForType.trainings" />
    </VWindowItem>
  </VWindow>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { sortTrainings } from "@/utils";
import { Training, TrainingPage } from "@/types";
import TrainingTable from "@/components/training/TrainingTable.vue";
import VueMarkdown from "vue-markdown-render";

const props = defineProps<{
  trainings: Training[];
  trainingPage: TrainingPage;
}>();

function formatTrainingType(trainingType: Training["attributes"]["type"]) {
  switch (trainingType) {
    case "youth":
      return "Jeugd";
    case "fromCadet":
      return "Vanaf Cadet";
    case "gTeam":
      return "G-team";
    case "joggers":
      return "Joggers";
    default:
      return trainingType;
  }
}

const trainingTypes = new Set(
  props.trainings.map((training) => training.attributes.type)
);

const trainingsWithIntroPerType = props.trainings
  .slice()
  .sort(sortTrainings)
  .reduce<
    Record<
      Training["attributes"]["type"],
      { trainings: Training[]; intro: string }
    >
  >((trainingsPerTypeAcc, training) => {
    const trainingsForType =
      trainingsPerTypeAcc[training.attributes.type]?.trainings || [];
    return {
      ...trainingsPerTypeAcc,
      [training.attributes.type]: {
        trainings: trainingsForType.concat(training),
        intro:
          props.trainingPage.attributes[
            `intro${training.attributes.type
              .slice(0, 1)
              .toUpperCase()}${training.attributes.type.slice(1)}` as
              | "introYouth"
              | "introFromCadet"
              | "introGTeam"
              | "introJoggers"
          ],
      },
    };
  }, {} as Record<Training["attributes"]["type"], { trainings: Training[]; intro: string }>);

const activeTab = ref([...trainingTypes][0]);
</script>
