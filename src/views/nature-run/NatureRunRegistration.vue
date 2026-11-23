<template>
  <PageHeader v-if="natureRun">{{ natureRun.attributes.title }}</PageHeader>
  <RegistrationForm
    v-if="natureRun"
    v-bind="natureRun"
    :couponCodeError="couponCodeError"
    :isSubmitting="isSubmitting"
    @submit="handleSubmit"
  />
  <VAlert v-if="submitError" type="error" class="mx-4">{{ submitError }}</VAlert>
  <VueMarkdown
    v-if="!natureRun"
    :source="noNatureRunMessage"
    :options="{ breaks: true, linkify: true, html: true }"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { isAxiosError } from "axios";
import RegistrationForm from "@/components/nature-run/RegistrationForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import {getNatureRun, getNoNatureRunMessage, handleNatureRunRegistration} from "@/api-client";
import {NatureRunRegistrationRaw, WithRequired} from "@/types";
import VueMarkdown from "vue-markdown-render";

const natureRun = await getNatureRun();
let noNatureRunMessage = '';
if (!natureRun) {
  noNatureRunMessage = await getNoNatureRunMessage();
}

const isSubmitting = ref(false);
const couponCodeError = ref<string | null>(null);
const submitError = ref<string | null>(null);

async function handleSubmit(
  natureRunRegistrationRaw: WithRequired<
    NatureRunRegistrationRaw,
    "gender" | "distance" | "birthYear"
  >
) {
  isSubmitting.value = true;
  couponCodeError.value = null;
  submitError.value = null;
  try {
    const checkoutUrl = await handleNatureRunRegistration(
      natureRunRegistrationRaw
    );
    // Keep the button loading while the browser navigates away
    window.location.assign(checkoutUrl);
  } catch (error) {
    // 422 = invalid or already used coupon code, the body is the message to show
    if (
      isAxiosError(error) &&
      error.response?.status === 422 &&
      typeof error.response.data === "string"
    ) {
      couponCodeError.value = error.response.data;
    } else {
      submitError.value =
        "Er ging iets mis bij het registreren. Probeer het later opnieuw.";
    }
    isSubmitting.value = false;
  }
}
</script>
