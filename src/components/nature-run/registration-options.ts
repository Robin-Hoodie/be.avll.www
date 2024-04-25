import {
  NatureRunRegistrationGender,
  TShirtSize,
} from "@/types";

interface OptionWithLabel<T> {
  label: string;
  value: T;
}

export const genderOptions: Array<
  OptionWithLabel<NatureRunRegistrationGender>
> = [
  {
    value: "male",
    label: "Man",
  },
  {
    value: "female",
    label: "Vrouw",
  },
  {
    value: "unidentified",
    label: "X",
  },
];

export const tShirtSizeOptions: TShirtSize[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];
