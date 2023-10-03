import { getBirthYearRules, getEmailRules, getRequiredRule } from "@/utils";

export const firstNameRules = [getRequiredRule("Voornaam")];
export const lastNameRules = [getRequiredRule("Achternaam")];
export const emailRules = getEmailRules();
export const streetRules = [getRequiredRule("Straat")];
export const zipCodeRules = [getRequiredRule("Postcode")];
export const placeRules = [getRequiredRule("Gemeente")];
export const genderRules = [getRequiredRule("Geslacht")];
export const birthYearRules = getBirthYearRules();
export const emergencyPhoneNumberRules = [getRequiredRule("Noodnummer")];
export const distanceRules = [getRequiredRule("Afstand")];
export const tShirtSizeRules = [getRequiredRule("Grootte T-Shirt")];
export const privacyTermsRules = [getRequiredRule("Voor akkoord")];
