<template>
  <VForm :onSubmit="handleSubmit" validateOn="lazy blur">
    <VTextField v-model="registration.event" :rules="eventRules" required>
      <template #label>
        <RequiredLabel>Kampioenschap of meeting</RequiredLabel>
      </template>
    </VTextField>
    <VTextField v-model="registration.name" :rules="nameRules" required>
      <template #label><RequiredLabel>Naam</RequiredLabel></template>
    </VTextField>
    <VTextField
      v-model="registration.email"
      :rules="emailRules"
      type="email"
      required
    >
      <template #label>
        <RequiredLabel>Email</RequiredLabel>
      </template>
    </VTextField>
    <VRadioGroup v-model="registration.gender" :rules="genderRules" inline>
      <template #label>
        <RequiredLabel>Geslacht</RequiredLabel>
      </template>
      <VRadio
        v-for="genderOption in genderOptions"
        :value="genderOption.value"
        :label="genderOption.label"
        :key="genderOption.value"
        color="primary"
      />
    </VRadioGroup>
    <VTextField
      v-model.number="registration.birthYear"
      :rules="birthYearRules"
      required
      type="number"
    >
      <template #label><RequiredLabel>Geboortejaar</RequiredLabel></template>
    </VTextField>
    <VSelect
      v-model="registration.category"
      :rules="categoryRules"
      :items="categoryOptions"
      required
    >
      <template #label><RequiredLabel>Categorie</RequiredLabel></template>
    </VSelect>
    <VTextField
      v-model="registration.valNumber"
      label="VAL nummer *"
      :rules="valNumberRules"
      required
    >
      <template #label>
        <RequiredLabel>VAL nummer</RequiredLabel>
      </template>
    </VTextField>
    <VTextField
      v-model="registration.discipline"
      :rules="disciplineRules"
      required
    >
      <template #label>
        <RequiredLabel>Discipline</RequiredLabel>
      </template>
    </VTextField>
    <VTextField
      v-model="registration.bestPerformance"
      :rules="bestPerformanceRules"
      required
    >
      <template #label>
        <RequiredLabel>Beste prestatie</RequiredLabel>
      </template>
    </VTextField>
    <VTextarea v-model="registration.comment" label="Opmerking" />
    <VBtn type="submit" color="primary" class="mt-2">Registreren</VBtn>
  </VForm>
  <VSnackbar v-model="isFormSubmittedMessageVisible">
    {{ attributes.registrationSubmittedMessage }}
    <template #actions>
      <VBtn variant="text" @click="closeFormSubmittedMessage">{{
        attributes.registrationSubmittedCloseButtonText
      }}</VBtn>
    </template>
  </VSnackbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SubmitEventPromise } from "vuetify";
import { Registration, RegistrationPage } from "@/types";
import {
  categoryOptions,
  genderOptions,
} from "@/components/registration/registration-options";
import RequiredLabel from "@/components/form/RequiredLabel.vue";
import {
  eventRules,
  nameRules,
  emailRules,
  genderRules,
  birthYearRules,
  categoryRules,
  valNumberRules,
  disciplineRules,
  bestPerformanceRules,
} from "@/components/registration/registration-rules";
import { WithRequired } from "@/types";
import { sendRegistrationEmails } from "@/api-client";

defineProps<RegistrationPage>();

function getInitialRegistration() {
  return {
    event: "",
    name: "",
    email: "",
    gender: null,
    birthYear: null,
    category: null,
    valNumber: "",
    discipline: "",
    bestPerformance: "",
    comment: "",
  };
}

const registration = ref<Registration["attributes"]>(getInitialRegistration());

const isFormSubmittedMessageVisible = ref(false);

function closeFormSubmittedMessage() {
  isFormSubmittedMessageVisible.value = false;
}

function openFormSubmittedMessage() {
  isFormSubmittedMessageVisible.value = true;
}

async function handleSubmit(eventPromise: SubmitEventPromise) {
  eventPromise.preventDefault();
  const { valid } = await eventPromise;

  if (valid) {
    await sendRegistrationEmails(
      registration.value as WithRequired<
        Registration["attributes"],
        "gender" | "category" | "birthYear"
      >
    );
    openFormSubmittedMessage();
    registration.value = getInitialRegistration();
  }
}
</script>
