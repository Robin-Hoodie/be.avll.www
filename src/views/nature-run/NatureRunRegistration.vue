<template>
  <PageHeader>Registratie Natuurlopen - {{ dateFormatted }}</PageHeader>
  <RegistrationForm />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useRoute } from "vue-router";
import { formatDateFull } from "@/utils";
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";

const {
  params: { date },
} = useRoute();
const dateFormatted = formatDateFull(
  dayjs(date as string, "DD-MM-YYYY").toDate()
);
</script>
