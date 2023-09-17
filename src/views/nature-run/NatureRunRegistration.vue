<template>
  <PageHeader v-if="dateFormatted"
    >Registratie Natuurlopen - {{ dateFormatted }}</PageHeader
  >
  <RegistrationForm v-if="natureRun" v-bind="natureRun" />
  <div v-else>
    Er is momenteel geen natuurloop waar u zich voor kan registreren
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { formatDateFull } from "@/utils";
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import { getNatureRun } from "@/api-client";

const natureRun = await getNatureRun();

const dateFormatted = natureRun
  ? formatDateFull(dayjs(natureRun.date).toDate())
  : null;
</script>
