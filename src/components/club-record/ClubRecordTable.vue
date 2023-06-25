<template>
  <VTable>
    <thead>
      <tr>
        <th>Leeftijdscategorie</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="clubRecord in clubRecordsSortedByAgeBracket"
        :key="clubRecord.id"
      >
        <td>
          <strong>
            {{ formatAgeBracket(clubRecord.ageBracket) }}
          </strong>
        </td>
        <td>
          <a class="text-primary" :href="clubRecord.file.url">{{
            clubRecord.category
          }}</a>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>

<script lang="ts" setup>
import { ClubRecord } from "@/types";

const props = defineProps<{ clubRecords: ClubRecord[] }>();

const clubRecordsSortedByAgeBracket = props.clubRecords
  .slice()
  .sort(({ ageBracket: ageBracketOne }, { ageBracket: ageBracketTwo }) => {
    if (ageBracketOne === "youth") {
      return ageBracketTwo === "youth" ? 0 : -1;
    }
    if (ageBracketOne === "fromCadet") {
      if (ageBracketTwo === "youth") {
        return 1;
      }
      return ageBracketTwo === "fromCadet" ? 0 : -1;
    }
    return ageBracketTwo === "master" ? 0 : 1;
  });

function formatAgeBracket(ageBracket: ClubRecord["ageBracket"]) {
  switch (ageBracket) {
    case "youth":
      return "Jeugd";
    case "fromCadet":
      return "Vanaf cadet";
    case "master":
      return "Masters";
  }
}
</script>
