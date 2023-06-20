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

<script lang="ts" setup generic="T extends {date: string}">
import { computed, ref } from "vue";
import dayjs from "dayjs";

const props = defineProps<{ list: T[] }>();

const listPerYear = computed(() =>
  props.list.reduce<Record<number, T[]>>((listPerYearAcc, item) => {
    const year = dayjs(item.date).year();
    const listForYear = listPerYearAcc[year] || [];
    return {
      ...listPerYearAcc,
      [year]: listForYear.concat(item),
    };
  }, {})
);
const years = computed(() =>
  Object.keys(listPerYear.value)
    .sort((yearOne, yearTwo) => Number(yearTwo) - Number(yearOne))
    .map(Number)
);

const activeTab = ref(years.value[0]);
</script>
