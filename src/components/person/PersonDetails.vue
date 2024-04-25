<template>
  <VCard
    :elevation="5"
    rounded
    :border="isProminent ? 'primary md opacity-100' : false"
  >
    <VCardTitle class="d-flex align-center">
      <VAvatar color="primary" size="x-small" class="mr-2">
        <VIcon size="x-small">mdi-account-tie</VIcon>
      </VAvatar>
      <span>
        {{ person.attributes.name }}
      </span>
    </VCardTitle>
    <VCardSubtitle v-if="title" :title="title">
      {{ title }}
    </VCardSubtitle>
    <VCardText class="d-flex">
      <div class="mr-4" v-if="person.attributes.profilePhoto.data">
        <VImg
          :src="person.attributes.profilePhoto.data.attributes.url"
          :height="person.attributes.profilePhoto.data.attributes.height"
          :width="person.attributes.profilePhoto.data.attributes.width"
        />
      </div>
      <div>
        <div
          v-if="
            person.attributes.addressStreet || person.attributes.addressPlace
          "
          class="d-flex align-center"
        >
          <VIcon class="pr-2">mdi-home</VIcon>
          <div>
            <div v-if="person.attributes.addressStreet">
              {{ person.attributes.addressStreet }}
            </div>
            <div v-if="person.attributes.addressPlace">
              <span v-if="person.attributes.addressZip">{{
                person.attributes.addressZip
              }}</span>
              {{ " " }}
              <span>{{ person.attributes.addressPlace }}</span>
            </div>
          </div>
        </div>
        <div v-if="person.attributes.phoneMobile">
          <VIcon class="pr-2">mdi-phone</VIcon>
          <ThemedLink :href="`tel:${person.attributes.phoneMobile}`">
            {{
              formatPhone(person.attributes.phoneMobile, "mobile")
            }}</ThemedLink
          >
        </div>
        <div v-if="person.attributes.phoneLandLine">
          <VIcon class="pr-2">mdi-phone</VIcon>
          <ThemedLink :href="`tel:${person.attributes.phoneLandLine}`">{{
            formatPhone(person.attributes.phoneLandLine, "home")
          }}</ThemedLink>
        </div>
        <div v-if="person.attributes.email">
          <VIcon class="pr-2">mdi-email</VIcon>
          <ThemedLink :href="`mailto:${person.attributes.email}`">{{
            person.attributes.email
          }}</ThemedLink>
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { Person } from "@/types";
import ThemedLink from "@/components/ThemedLink.vue";

defineProps<{
  person: Person;
  isProminent: boolean;
  title: string | null;
}>();

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
