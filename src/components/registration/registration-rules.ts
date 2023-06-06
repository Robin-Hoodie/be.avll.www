export const eventRules = [getRequiredRule("Kampioenschap of event")];
export const nameRules = [getRequiredRule("Naam")];
export const emailRules = [
  getRequiredRule("E-mail"),
  (value: string) =>
    // Regex taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#answer-48800
    /^\S+@\S+\.\S+$/.test(value) || "Dit is geen geldig e-mail adres",
];
export const genderRules = [getRequiredRule("Geslacht")];
export const birthYearRules = [
  getRequiredRule("Geboortejaar"),
  (value: string) => {
    const currentYear = new Date().getFullYear();
    const valueAsNumber = Number(value);
    if (valueAsNumber) {
      if (valueAsNumber < currentYear - 100) {
        return "Zo oud ben je nu ook weer niet..";
      }
      if (valueAsNumber >= currentYear) {
        return "Mensen van de toekomst kunnen hier niet registreren";
      }
      return true;
    }
    return "Dit is geen geldig geboortejaar";
  },
];
export const valNumberRules = [
  getRequiredRule("VAL nummer"),
  (value: string) =>
    /^\d+$/.test(value) || "Een VAL nummer kan alleen cijfers bevatten",
];
export const categoryRules = [getRequiredRule("Categorie")];
export const disciplineRules = [getRequiredRule("Discipline")];
export const bestPerformanceRules = [getRequiredRule("Beste prestatie")];

function getRequiredRule(label: string) {
  return (value: string | null) => {
    return (value && value.length > 0) || `${label} is vereist`;
  };
}
