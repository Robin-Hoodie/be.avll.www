import showdown, { type ConverterOptions } from "showdown";
import type { NatureRun, NatureRunRegistration } from "../types";
import { formatDateFull } from "./utils";

interface ShowdownOptionsExtended extends ConverterOptions {
  replaceVarsOptions?: {
    natureRun: NatureRun;
    natureRunRegistration: NatureRunRegistration;
  };
}

function parseNatureRunRegistrationDistance(
  natureRunRegistration: NatureRunRegistration
) {
  if (natureRunRegistration.distance === "fiveK") {
    return "5KM";
  }
  if (natureRunRegistration.distance === "tenK") {
    return "10KM";
  }
  return "lange afstand";
}

function replaceDistance(
  template: string,
  natureRunRegistration: NatureRunRegistration
) {
  return template.replace(
    /{{natureRunRegistration.distance}}/g,
    parseNatureRunRegistrationDistance(natureRunRegistration)
  );
}

function replaceDate(template: string, natureRun: NatureRun) {
  return template.replace(
    /{{natureRun.date}}/g,
    formatDateFull(natureRun.date)
  );
}

showdown.extension("replaceVars", {
  type: "lang",
  filter(text, _, options?: ShowdownOptionsExtended) {
    if (options?.replaceVarsOptions) {
      return replaceDate(
        replaceDistance(text, options.replaceVarsOptions.natureRunRegistration),
        options.replaceVarsOptions.natureRun
      );
    }
    return text;
  },
});

export function parseNatureRunEmailContent(
  natureRun: NatureRun,
  natureRunRegistration: NatureRunRegistration
) {
  const markdownToHtml = new showdown.Converter({
    simplifiedAutoLink: true,
    extensions: ["replaceVars"],
    replaceVarsOptions: {
      natureRun,
      natureRunRegistration,
    },
  });
  return markdownToHtml.makeHtml(natureRun.emailContent);
}

export function parseNatureRunEmailSubject(
  natureRun: NatureRun,
  natureRunRegistration: NatureRunRegistration
) {
  return replaceDate(
    replaceDistance(natureRun.emailSubject, natureRunRegistration),
    natureRun
  );
}
