<template>
  <trainings-per-type v-if="trainings" :trainings="trainings" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TrainingsPerType from "@/components/training/TrainingsPerType.vue";
import { useLoading } from "@/composables/useLoading";
import { Training } from "@/types";
import { getTrainings } from "@/api-client";

const trainings = ref<Training[] | null>(null);

useLoading(async () => (trainings.value = await getTrainings()));
</script>
