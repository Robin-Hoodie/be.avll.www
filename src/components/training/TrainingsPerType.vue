<template>
  <v-tabs v-model="activeTab" align-tabs="center" center-active>
    <v-tab
      v-for="trainingType in trainingTypes"
      :value="trainingType"
      :key="trainingType"
      color="primary"
    >
      {{ formatTrainingType(trainingType) }}
    </v-tab>
  </v-tabs>
  <v-window v-model="activeTab">
    <v-window-item
      v-for="(trainingsForType, trainingType) in trainingsPerType"
      :key="trainingType"
      :value="trainingType"
    >
      <training-table :trainings="trainingsForType" />
    </v-window-item>
  </v-window>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Training } from "@/types";
import TrainingTable from "@/components/training/TrainingTable.vue";

const props = defineProps<{ trainings: Training[] }>();

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

const trainingTypes = computed(
  () => new Set(props.trainings.map((training) => training.type))
);

const trainingsPerType = computed(() =>
  props.trainings.reduce<Record<Training["type"], Training[]>>(
    (trainingsPerTypeAcc, training) => {
      const trainingsForType = trainingsPerTypeAcc[training.type] || [];
      return {
        ...trainingsPerTypeAcc,
        [training.type]: trainingsForType.concat(training),
      };
    },
    {} as Record<Training["type"], Training[]>
  )
);

const activeTab = ref([...trainingTypes.value][0]);
</script>
