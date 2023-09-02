<template>
  <VForm :onSubmit="handleSubmit" validateOn="lazy blur">
    <VContainer>
      <VRow>
        <VCol :cols="12">
          <h2>Persoonlijke informatie</h2>
          <p>
            Gelieve een juist adres in te geven, dit zal ook gebruikt worden om
            je eventuele T-Shirt naar toe te sturen.
          </p>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VTextField
            v-model="registration.firstName"
            :rules="firstNameRules"
            required
          >
            <template #label>
              <RequiredLabel>Voornaam</RequiredLabel>
            </template>
          </VTextField>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VTextField
            v-model="registration.lastName"
            :rules="lastNameRules"
            required
          >
            <template #label
              ><RequiredLabel>Achternaam</RequiredLabel></template
            >
          </VTextField>
        </VCol>
        <VCol :cols="12">
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
        </VCol>
        <VCol :cols="12" :sm="9">
          <VTextField
            v-model="registration.street"
            :rules="streetRules"
            required
          >
            <template #label>
              <RequiredLabel>Straat & huisnummer</RequiredLabel>
            </template>
          </VTextField>
        </VCol>
        <VCol :cols="12" :sm="3">
          <VTextField v-model="registration.bus" label="Bus" />
        </VCol>
        <VCol :cols="12" :sm="3">
          <VTextField
            v-model="registration.zipCode"
            :rules="zipCodeRules"
            required
          >
            <template #label>
              <RequiredLabel>Postcode</RequiredLabel>
            </template>
          </VTextField>
        </VCol>
        <VCol :cols="12" :sm="9">
          <VTextField v-model="registration.city" :rules="cityRules" required>
            <template #label>
              <RequiredLabel>Gemeente</RequiredLabel>
            </template>
          </VTextField>
        </VCol>
        <VCol :cols="12" :sm="3">
          <VRadioGroup
            v-model="registration.gender"
            :rules="genderRules"
            inline
          >
            <template #label>
              <RequiredLabel>Geslacht</RequiredLabel>
            </template>
            <VRadio
              v-for="gender in genderOptions"
              :key="gender.value"
              :label="gender.label"
              :value="gender.value"
              color="primary"
            />
          </VRadioGroup>
        </VCol>
        <VCol :cols="12" :sm="9">
          <VTextField
            v-model="registration.birthYear"
            :rules="birthYearRules"
            required
          >
            <template #label
              ><RequiredLabel>Geboortejaar</RequiredLabel></template
            >
          </VTextField>
        </VCol>
        <VDivider />
        <VCol :cols="12">
          <h2>Loop informatie</h2>
          <p>
            In dit vak krijg je meer inzicht in welke informatie we nodig hebben
            voor je registratie te voltooien.
          </p>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VTextField
            v-model="registration.emergencyPhoneNumber"
            :rules="emergencyPhoneNumberRules"
            type="tel"
            required
          >
            <template #label
              ><RequiredLabel>Noodnummer</RequiredLabel></template
            >
          </VTextField>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VRadioGroup
            v-model="registration.distance"
            :rules="distanceRules"
            inline
          >
            <template #label>
              <RequiredLabel>Afstand</RequiredLabel>
            </template>
            <VRadio
              v-for="distance in distanceOptions"
              :key="distance.value"
              :label="distance.label"
              :value="distance.value"
              color="primary"
            />
          </VRadioGroup>
        </VCol>
        <VCol :cols="12">
          <VTextarea v-model="registration.comment" label="Opmerking" />
        </VCol>
        <VCol :cols="12" :sm="registration.withTShirt ? 3 : 12">
          <VCheckbox
            color="primary"
            v-model="registration.withTShirt"
            label="T-Shirt"
          />
        </VCol>
        <VCol v-if="registration.withTShirt" :cols="12" :sm="6">
          <VSelect :rules="tShirtSizeRules" :items="tShirtSizeOptions" required>
            <template #label>
              <RequiredLabel>Grootte T-Shirt</RequiredLabel>
            </template>
          </VSelect>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VCheckbox
            color="primary"
            v-model="registration.agreeToPrivacyTerms"
            required
          >
            <template #label>
              <RequiredLabel>
                <div>Voor akkoord</div>
                <div class="text-subtitle-2">
                  Met mijn deelname ga ik akkoord met de
                  <ThemedLink :href="privacyLink.file.url">{{
                    privacyLink.description
                  }}</ThemedLink>
                  zoals in het algemeen reglement vermeld is!
                </div>
              </RequiredLabel>
            </template>
          </VCheckbox>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VCheckbox
            color="primary"
            v-model="registration.isMember"
            label="Lid van AV Lyra-Lierse"
          />
        </VCol>
        <VDivider />
        <VCol :cols="12" :sm="3">
          <strong>{{ price }}</strong>
        </VCol>
        <VCol :cols="12" :sm="9">
          <VBtn type="submit" color="primary" class="mt-2">Registreren</VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </VForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { SubmitEventPromise } from "vuetify";
import { NatureRunRegistration, WithRequired } from "@/types";
import {
  distanceOptions,
  genderOptions,
  tShirtSizeOptions,
} from "@/components/nature-run/registration-options";
import RequiredLabel from "@/components/form/RequiredLabel.vue";
import {
  firstNameRules,
  lastNameRules,
  streetRules,
  zipCodeRules,
  cityRules,
  distanceRules,
  emergencyPhoneNumberRules,
  emailRules,
  genderRules,
  birthYearRules,
  tShirtSizeRules,
  privacyTermsRules,
} from "@/components/nature-run/registration-rules";
import {
  getFileLinks,
  handleNatureRunRegistration,
  sendRegistrationEmails,
} from "@/api-client";
import ThemedLink from "../ThemedLink.vue";
import { computed } from "vue";

const registration = reactive<NatureRunRegistration>({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  bus: "",
  zipCode: "",
  city: "",
  gender: null,
  birthYear: null,
  comment: "",
  distance: null,
  emergencyPhoneNumber: "",
  isMember: false,
  withTShirt: false,
  agreeToPrivacyTerms: false,
});

const [privacyLink] = await getFileLinks(["privacyStatement"]);

const price = computed(() => {
  if (registration.isMember) {
    return registration.withTShirt ? "€22,00" : "€5,00";
  }
  return registration.withTShirt ? "€24,00" : "€7,00";
});

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
    await handleNatureRunRegistration(
      registration as WithRequired<NatureRunRegistration, "gender" | "distance">
    );
    openFormSubmittedMessage();
  }
}
</script>
