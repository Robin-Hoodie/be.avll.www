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
          <VTextField v-model="registration.place" :rules="placeRules" required>
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
            v-model.number="registration.birthYear"
            :rules="birthYearRules"
            required
            type="number"
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
        <VCol v-if="isPK" :cols="2" :sm="12">
          <VCheckbox
            color="primary"
            v-model="registration.runsWithPK"
            label="Ik neem deel aan PK"
        /></VCol>
        <VCol v-if="registration.runsWithPK" :cols="5" :sm="6">
          <VTextField
            v-model="registration.bibNumber"
            :rules="bibNumberRules"
            required
          >
            <template #label
              ><RequiredLabel>Borstnummer</RequiredLabel></template
            >
          </VTextField></VCol
        >
        <VCol v-if="registration.runsWithPK" :cols="5" :sm="6">
          <VTextField
            v-model="registration.clubName"
            :rules="clubNameRules"
            required
          >
            <template #label><RequiredLabel>Clubnaam</RequiredLabel></template>
          </VTextField></VCol
        >
        <VCol :cols="12">
          <VTextarea v-model="registration.comment" label="Opmerking" />
        </VCol>
        <VCol
          v-if="withTShirt"
          :cols="12"
          :sm="registration.withTShirt ? 3 : 12"
        >
          <VCheckbox
            color="primary"
            v-model="registration.withTShirt"
            label="T-Shirt"
          />
        </VCol>
        <VCol v-if="registration.withTShirt" :cols="12" :sm="6">
          <VSelect
            v-model="registration.tShirtSize"
            :rules="tShirtSizeRules"
            :items="tShirtSizeOptions"
            required
          >
            <template #label>
              <RequiredLabel>Grootte T-Shirt</RequiredLabel>
            </template>
          </VSelect>
        </VCol>
        <VCol :cols="12" :sm="6">
          <VCheckbox
            color="primary"
            v-model="registration.agreeToPrivacyTerms"
            :rules="privacyTermsRules"
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
          <strong>{{ priceFormatted }}</strong>
        </VCol>
        <VCol :cols="12" :sm="9">
          <VBtn type="submit" color="primary" class="mt-2">Registreren</VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </VForm>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SubmitEventPromise } from "vuetify";
import { NatureRun, NatureRunRegistration, WithRequired } from "@/types";
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
  placeRules,
  distanceRules,
  emergencyPhoneNumberRules,
  emailRules,
  genderRules,
  birthYearRules,
  tShirtSizeRules,
  privacyTermsRules,
  bibNumberRules,
  clubNameRules,
} from "@/components/nature-run/registration-rules";
import { getFileLinks } from "@/api-client";
import ThemedLink from "../ThemedLink.vue";
import { computed } from "vue";

const natureRun = defineProps<NatureRun>();
const emit = defineEmits<{
  (
    event: "submit",
    natureRunRegistrationAndNatureRun: {
      natureRunRegistration: WithRequired<
        NatureRunRegistration,
        "gender" | "distance" | "birthYear"
      >;
      natureRun: NatureRun;
    }
  ): void;
}>();

const registration = ref<NatureRunRegistration>({
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  bus: null,
  zipCode: "",
  place: "",
  gender: null,
  birthYear: null,
  comment: "",
  distance: null,
  emergencyPhoneNumber: "",
  isMember: false,
  withTShirt: false,
  agreeToPrivacyTerms: false,
  tShirtSize: null,
  isPaid: false,
  runsWithPK: false,
  bibNumber: "",
  clubName: "",
});

const [privacyLink] = await getFileLinks(["privacyStatement"]);

const withTShirt = computed(() => {
  return typeof natureRun.tShirtPrice === "number";
});

const price = computed(() => {
  if (registration.value.isMember) {
    return registration.value.withTShirt
      ? natureRun.basePrice +
          (natureRun.tShirtPrice ?? 0) -
          natureRun.memberDiscount
      : natureRun.basePrice - natureRun.memberDiscount;
  }
  return registration.value.withTShirt
    ? natureRun.basePrice + (natureRun.tShirtPrice ?? 0)
    : natureRun.basePrice;
});

const priceFormatted = computed(() => `€${price.value.toFixed(2)}`);

async function handleSubmit(eventPromise: SubmitEventPromise) {
  eventPromise.preventDefault();
  const { valid } = await eventPromise;

  if (valid) {
    const natureRunRegistrationFinal = {
      ...registration.value,
      tShirtSize: registration.value.withTShirt
        ? registration.value.tShirtSize
        : null,
      bibNumber: registration.value.runsWithPK
        ? registration.value.bibNumber
        : null,
      clubName: registration.value.runsWithPK
        ? registration.value.clubName
        : null,
    } as WithRequired<
      NatureRunRegistration,
      "gender" | "distance" | "birthYear"
    >;
    emit("submit", {
      natureRunRegistration: natureRunRegistrationFinal,
      natureRun: natureRun,
    });
  }
}
</script>
