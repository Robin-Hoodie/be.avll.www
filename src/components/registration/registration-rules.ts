import { getBirthYearRules, getEmailRules, getRequiredRule } from "@/utils";

export const eventRules = [getRequiredRule("Kampioenschap of event")];
export const nameRules = [getRequiredRule("Naam")];
export const emailRules = getEmailRules();
export const genderRules = [getRequiredRule("Geslacht")];
export const birthYearRules = getBirthYearRules();
export const valNumberRules = [
  getRequiredRule("VAL nummer"),
  (value: string) =>
    /^\d+$/.test(value) || "Een VAL nummer kan alleen cijfers bevatten",
];
export const categoryRules = [getRequiredRule("Categorie")];
export const disciplineRules = [getRequiredRule("Discipline")];
export const bestPerformanceRules = [getRequiredRule("Beste prestatie")];
