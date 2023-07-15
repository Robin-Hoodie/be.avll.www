import dayjs from "dayjs";

export function formatDateFull(date: string | number | Date) {
  return dayjs(date).format("D MMM YYYY");
}

export function clipLink(link: string, maxLength: number) {
  return link.length <= maxLength ? link : `${link.slice(0, maxLength - 2)}..`;
}

export function getRequiredRule(label: string) {
  return (value: string | null) => {
    return (value && value.length > 0) || `${label} is vereist`;
  };
}

export function getBirthYearRules(label = "Geboortejaar") {
  return [
    getRequiredRule(label),
    (inputYear: string) => {
      const currentYear = dayjs().year();
      const inputYearAsNumber = Number(inputYear);
      if (typeof inputYearAsNumber === "number") {
        if (inputYearAsNumber < currentYear - 100) {
          return "Zo oud ben je nu ook weer niet..";
        }
        if (inputYearAsNumber >= currentYear) {
          return "Mensen van de toekomst kunnen hier niet registreren";
        }
        return true;
      }
      return "Dit is geen geldig geboortejaar";
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
