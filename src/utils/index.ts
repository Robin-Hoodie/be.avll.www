import { Training } from "@/types";
import dayjs from "dayjs";

export function formatDateFull(date: string | number | Date) {
  return dayjs(date).format("D MMM YYYY");
}

export function clipLink(link: string, maxLength: number) {
  return link.length <= maxLength ? link : `${link.slice(0, maxLength - 2)}..`;
}

export function getRequiredRule(label: string) {
  return (value: string | number | boolean | null) => {
    if (value === null) {
      return `${label} is vereist`;
    }
    if (typeof value === "string") {
      return value.length > 0 || `${label} is vereist`;
    }
    if (typeof value === "boolean") {
      return value || `${label} is vereist`;
    }
    return true;
  };
}

export function getBirthYearRules(label = "Geboortejaar") {
  return [
    getRequiredRule(label),
    (inputYear: number) => {
      const currentYear = dayjs().year();
      if (inputYear < currentYear - 100) {
        return "Zo oud ben je nu ook weer niet..";
      }
      if (inputYear >= currentYear) {
        return "Mensen van de toekomst kunnen hier niet registreren";
      }
      return true;
    },
  ];
}

export function getEmailRules(label = "E-mail") {
  return [
    getRequiredRule(label),
    (value: string) =>
      // Regex taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript#answer-48800
      /^\S+@\S+\.\S+$/.test(value) || "Dit is geen geldig e-mail adres",
  ];
}

const dayToSortFactor = {
  Maandag: 0,
  Dinsdag: 1,
  Woensdag: 2,
  Donderdag: 3,
  Vrijdag: 4,
  Zaterdag: 5,
  Zondag: 6,
};

export function sortTrainings(trainingOne: Training, trainingTwo: Training) {
  const trainingOneDaySortFactor = dayToSortFactor[trainingOne.day];
  const trainingTwoDaySortFactor = dayToSortFactor[trainingTwo.day];

  const daySortDifference = trainingOneDaySortFactor - trainingTwoDaySortFactor;

  if (daySortDifference === 0) {
    const trainingOneStartTime = dayjs(trainingOne.startTime, "HH:mm");
    const trainingTwoStartTime = dayjs(trainingTwo.startTime, "HH:mm");
    return trainingOneStartTime.diff(trainingTwoStartTime, "minute");
  }

  return daySortDifference;
}
