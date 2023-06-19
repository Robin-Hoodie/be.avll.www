<template>
  <trainings-per-type :trainings="trainings" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TrainingsPerType from "@/components/training/TrainingsPerType.vue";
import { getTrainings } from "@/api-client";

const trainings = ref(await getTrainings());
</script>
