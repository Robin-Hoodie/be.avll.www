<template>
  <v-form :onSubmit="handleSubmit" validateOn="lazy blur">
    <v-text-field v-model="registration.event" :rules="eventRules" required>
      <template #label>
        <required-label>Kampioenschap of meeting</required-label>
      </template>
    </v-text-field>
    <v-text-field v-model="registration.name" :rules="nameRules" required>
      <template #label><required-label>Naam</required-label></template>
    </v-text-field>
    <v-text-field
      v-model="registration.email"
      :rules="emailRules"
      type="email"
      required
    >
      <template #label>
        <required-label>Email</required-label>
      </template>
    </v-text-field>
    <v-radio-group v-model="registration.gender" :rules="genderRules" inline>
      <template #label>
        <required-label>Geslacht</required-label>
      </template>
      <v-radio value="male" label="Man" />
      <v-radio value="female" label="Vrouw" />
    </v-radio-group>
    <v-text-field
      v-model="registration.birthYear"
      :rules="birthYearRules"
      required
    >
      <template #label><required-label>Geboortejaar</required-label></template>
    </v-text-field>
    <v-select
      v-model="registration.category"
      :rules="categoryRules"
      :items="categoryOptions"
      required
    >
      <template #label><required-label>Categorie</required-label></template>
    </v-select>
    <v-text-field
      v-model="registration.valNumber"
      label="VAL nummer *"
      :rules="valNumberRules"
      required
    >
      <template #label>
        <required-label>VAL nummer</required-label>
      </template>
    </v-text-field>
    <v-text-field
      v-model="registration.discipline"
      :rules="disciplineRules"
      required
    >
      <template #label>
        <required-label>Discipline</required-label>
      </template>
    </v-text-field>
    <v-text-field
      v-model="registration.bestPerformance"
      :rules="bestPerformanceRules"
      required
    >
      <template #label>
        <required-label>Beste prestatie</required-label>
      </template>
    </v-text-field>
    <v-textarea v-model="registration.comment" label="Opmerking" />
    <v-btn type="submit" color="primary" class="mt-2">Registreren</v-btn>
  </v-form>
  <v-snackbar v-model="isFormSubmittedMessageVisible">
    {{ registrationSubmittedMessage }}
    <template #actions>
      <v-btn variant="text" @click="closeFormSubmittedMessage">{{
        registrationSubmittedCloseButtonText
      }}</v-btn>
    </template>
  </v-snackbar>
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
