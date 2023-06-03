<template>
  <v-card :elevation="5" rounded>
    <v-card-title class="d-flex align-center">
      <v-avatar color="primary" size="x-small" class="mr-2">
        <v-icon size="xs">mdi-face-man-profile</v-icon>
      </v-avatar>
      <span>
        {{ name }}
      </span>
    </v-card-title>
    <v-card-subtitle :title="title">
      {{ title }}
    </v-card-subtitle>
    <v-card-text class="d-flex">
      <div class="mr-4" v-if="portraitPhoto">
        <v-img
          :src="portraitPhoto.url"
          :height="portraitPhoto?.height"
          :width="portraitPhoto?.width"
        />
      </div>
      <div>
        <div v-if="addressStreet || addressPlace" class="d-flex align-center">
          <v-icon class="pr-2">mdi-home</v-icon>
          <div>
            <div v-if="addressStreet">
              {{ addressStreet }}
            </div>
            <div v-if="addressPlace">
              <span v-if="addressZip">{{ addressZip }}</span>
              <span>{{ addressPlace }}</span>
            </div>
          </div>
        </div>
        <div v-if="mobilePhone">
          <v-icon class="pr-2">mdi-phone</v-icon>
          <a :href="`tel:${mobilePhone}`" class="primary-link">
            {{ formatPhone(mobilePhone, "mobile") }}</a
          >
        </div>
        <div v-if="landlinePhone">
          <v-icon class="pr-2">mdi-phone</v-icon>
          <a :href="`tel:${landlinePhone}`" class="primary-link">{{
            formatPhone(landlinePhone, "home")
          }}</a>
        </div>
        <div v-if="email">
          <v-icon class="pr-2">mdi-email</v-icon>
          <a :href="`mailto:${email}`" class="primary-link">{{ email }}</a>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Person } from "@/types";

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

<style scoped>
.primary-link {
  color: rgb(var(--v-theme-primary));
}
</style>
