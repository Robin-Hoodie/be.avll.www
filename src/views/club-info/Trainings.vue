<template>
  <PageHeader>{{ trainingPage.title }}</PageHeader>
  <TrainingsPerType :trainings="trainings" :training-page="trainingPage" />
</template>

<script lang="ts" setup>
import TrainingsPerType from "@/components/training/TrainingsPerType.vue";
import { getTrainings, getTrainingPage } from "@/api-client";
import PageHeader from "@/components/PageHeader.vue";

const trainings = await getTrainings();
const trainingPage = await getTrainingPage();
</script>
