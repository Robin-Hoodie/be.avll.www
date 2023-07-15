import { RegistrationCategory, RegistrationGender } from "@/types";

export const categoryOptions: RegistrationCategory[] = [
  "Benjamins",
  "Pupillen",
  "Miniemen",
  "Kadetten",
  "Scholieren",
  "Juniors",
  "Seniors",
  "Masters",
];

export const genderOptions: Array<{
  value: RegistrationGender;
  label: string;
}> = [
  {
    value: "male",
    label: "Man",
  },
  {
    value: "female",
    label: "Vrouw",
  },
];
