<template>
  <page-header>Trainers</page-header
  ><trainers-per-role
    :trainers-per-role="{
      trainerYouth: trainersYouth,
      trainerFromCadet: trainersFromCadet,
      trainerJoggers: trainersJoggers,
      trainerGTeam: trainersGTeam,
    }"
  />
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import TrainersPerRole from "@/components/trainer/TrainersPerRole.vue";
import { usePeople } from "@/composables/usePeople";

const trainersYouth = await usePeople("trainerYouth");
const trainersFromCadet = await usePeople("trainerFromCadet");
const trainersJoggers = await usePeople("trainerJoggers");
const trainersGTeam = await usePeople("trainerGTeam");
</script>
