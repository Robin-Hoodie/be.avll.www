<template>
  <v-tabs align-tabs="center" center-active v-model="activeTab"
    ><v-tab v-for="role in roles" :value="role" :key="role" color="primary">
      {{ formatRole(role) }}
    </v-tab></v-tabs
  >
  <v-window v-model="activeTab">
    <v-window-item
      v-for="(trainersForRole, role) in trainersPerRole"
      :key="role"
      :value="role"
    >
      <person-details-list :people="trainersForRole" />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Person, TrainerRole } from "@/types";
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";

const props = defineProps<{
  trainersPerRole: Record<TrainerRole, Person[]>;
}>();

const roles = computed(
  () => Object.keys(props.trainersPerRole) as TrainerRole[]
);

const activeTab = ref(roles.value[0]);

function formatRole(role: TrainerRole) {
  switch (role) {
    case "trainerYouth":
      return "Jeugd";
    case "trainerFromCadet":
      return "Vanaf Cadet";
    case "trainerGTeam":
      return "G-team";
    case "trainerJoggers":
      return "Joggers";
  }
}
</script>
