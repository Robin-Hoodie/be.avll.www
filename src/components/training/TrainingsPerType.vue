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

function formatTrainingType(trainingType: Training["type"]) {
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

const trainingTypes = new Set(props.trainings.map((training) => training.type));

const trainingsWithIntroPerType = props.trainings
  .slice()
  .sort(sortTrainings)
  .reduce<Record<Training["type"], { trainings: Training[]; intro: string }>>(
    (trainingsPerTypeAcc, training) => {
      const trainingsForType =
        trainingsPerTypeAcc[training.type]?.trainings || [];
      return {
        ...trainingsPerTypeAcc,
        [training.type]: {
          trainings: trainingsForType.concat(training),
          intro:
            props.trainingPage[
              `intro${training.type
                .slice(0, 1)
                .toUpperCase()}${training.type.slice(1)}` as
                | "introYouth"
                | "introFromCadet"
                | "introGTeam"
                | "introJoggers"
            ],
        },
      };
    },
    {} as Record<Training["type"], { trainings: Training[]; intro: string }>
  );

const activeTab = ref([...trainingTypes][0]);
</script>
