<template>
  <VTabs align-tabs="center" center-active v-model="activeTab"
    ><VTab v-for="role in roleNames" :value="role" :key="role" color="primary">
      {{ formatRole(role) }}
    </VTab></VTabs
  >
  <VWindow v-model="activeTab">
    <VWindowItem
      v-for="(trainersForRole, roleName) in trainersPerRole"
      :key="roleName"
      :value="roleName"
    >
      <PersonDetailsList
        :people="trainersForRole"
        :active-role-name="roleName"
      />
    </VWindowItem>
  </VWindow>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Person, TrainerRoleName } from "@/types";
import PersonDetailsList from "@/components/person/PersonDetailsList.vue";

const props = defineProps<{
  trainersPerRole: Record<TrainerRoleName, Person[]>;
}>();

const roleNames = Object.keys(props.trainersPerRole) as TrainerRoleName[];

const activeTab = ref(roleNames[0]);

function formatRole(roleName: TrainerRoleName) {
  switch (roleName) {
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
