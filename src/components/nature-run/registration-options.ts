import {
  NatureRunRegistrationDistance,
  NatureRunRegistrationGender,
  TShirtSize,
} from "@/types";

interface OptionWithLabel<T> {
  label: string;
  value: T;
}

export const distanceOptions: Array<
  OptionWithLabel<NatureRunRegistrationDistance>
> = [
  {
    value: "fiveK",
    label: "5km",
  },
  {
    value: "tenK",
    label: "10km",
  },
  {
    value: "long",
    label: "Lange afstand",
  },
];

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
