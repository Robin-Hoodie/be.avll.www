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
      <VRadio value="male" label="Man" />
      <VRadio value="female" label="Vrouw" />
    </VRadioGroup>
    <VTextField
      v-model="registration.birthYear"
      :rules="birthYearRules"
      required
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
    {{ registrationSubmittedMessage }}
    <template #actions>
      <VBtn variant="text" @click="closeFormSubmittedMessage">{{
        registrationSubmittedCloseButtonText
      }}</VBtn>
    </template>
  </VSnackbar>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { SubmitEventPromise } from "vuetify";
import { RegistrationInitial, RegistrationPage } from "@/types";
import { categoryOptions } from "@/components/registration/registration-options";
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
import { sendRegistrationEmails } from "@/api-client";

defineProps<RegistrationPage>();

const registration = reactive<RegistrationInitial>({
  event: "",
  name: "",
  email: "",
  gender: null,
  birthYear: "",
  category: null,
  valNumber: "",
  discipline: "",
  bestPerformance: "",
  comment: "",
});

const isFormSubmittedMessageVisible = ref(false);

function closeFormSubmittedMessage() {
  isFormSubmittedMessageVisible.value = false;
}

function openFormSubmittedMessage() {
  isFormSubmittedMessageVisible.value = true;
}

async function handleSubmit(eventPromise: SubmitEventPromise) {
  const { valid } = await eventPromise;
  if (valid) {
    // await sendRegistrationEmails();
    openFormSubmittedMessage();
  }
}
</script>
