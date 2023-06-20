<template>
  <trainings-per-type :trainings="trainings" />
</template>

<script lang="ts" setup>
import TrainingsPerType from "@/components/training/TrainingsPerType.vue";
import { getTrainings } from "@/api-client";

const trainings = await getTrainings();
</script>
