<template>
  <VTabs v-model="activeTab" align-tabs="center" center-active>
    <VTab v-for="year in years" :value="year" :key="year" color="primary">
      {{ year }}
    </VTab>
  </VTabs>
  <VWindow v-model="activeTab">
    <VWindowItem
      v-for="(listForYear, year) in listPerYear"
      :key="Number(year)"
      :value="Number(year)"
    >
      <slot v-bind="{ listForYear }" />
    </VWindowItem>
  </VWindow>
</template>

<script lang="ts" setup generic="T extends { attributes: { date: string }}">
import { ref } from "vue";
import dayjs from "dayjs";

const props = defineProps<{ list: T[] }>();

const listPerYear = props.list.reduce<Record<number, T[]>>(
  (listPerYearAcc, item) => {
    const year = dayjs(item.attributes.date).year();
    const listForYear = listPerYearAcc[year] || [];
    return {
      ...listPerYearAcc,
      [year]: listForYear.concat(item),
    };
  },
  {}
);
const years = Object.keys(listPerYear)
  .sort((yearOne, yearTwo) => Number(yearTwo) - Number(yearOne))
  .map(Number);

const activeTab = ref(years[0]);
</script>
