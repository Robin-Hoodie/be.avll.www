<template>
  <VCard :elevation="5" rounded>
    <VCardTitle class="d-flex align-center">
      <VAvatar color="primary" size="x-small" class="mr-2">
        <VIcon size="x-small">mdi-account-tie</VIcon>
      </VAvatar>
      <span>
        {{ name }}
      </span>
    </VCardTitle>
    <VCardSubtitle :title="title">
      {{ title }}
    </VCardSubtitle>
    <VCardText class="d-flex">
      <div class="mr-4" v-if="profilePhoto">
        <VImg
          :src="profilePhoto.url"
          :height="profilePhoto?.height"
          :width="profilePhoto?.width"
        />
      </div>
      <div>
        <div v-if="addressStreet || addressPlace" class="d-flex align-center">
          <VIcon class="pr-2">mdi-home</VIcon>
          <div>
            <div v-if="addressStreet">
              {{ addressStreet }}
            </div>
            <div v-if="addressPlace">
              <span v-if="addressZip">{{ addressZip }}</span>
              {{ " " }}
              <span>{{ addressPlace }}</span>
            </div>
          </div>
        </div>
        <div v-if="phoneMobile">
          <VIcon class="pr-2">mdi-phone</VIcon>
          <ThemedLink :href="`tel:${phoneMobile}`">
            {{ formatPhone(phoneMobile, "mobile") }}</ThemedLink
          >
        </div>
        <div v-if="phoneLandLine">
          <VIcon class="pr-2">mdi-phone</VIcon>
          <ThemedLink :href="`tel:${phoneLandLine}`">{{
            formatPhone(phoneLandLine, "home")
          }}</ThemedLink>
        </div>
        <div v-if="email">
          <VIcon class="pr-2">mdi-email</VIcon>
          <ThemedLink :href="`mailto:${email}`">{{ email }}</ThemedLink>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { Person } from "@/types";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<Person>();

function formatPhone(phone: string, type: "mobile" | "home") {
  if (type === "mobile") {
    if (phone.length === 10) {
      return `${phone.slice(0, 4)} ${phone.slice(4, 6)} ${phone.slice(
        6,
        8
      )} ${phone.slice(8)}`;
    }
    return phone;
  }
  if (phone.length === 9) {
    return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(
      5,
      7
    )} ${phone.slice(7)}`;
  }
  return phone;
}
</script>
