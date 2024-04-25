import showdown, { type ConverterOptions } from "showdown";
import type { NatureRun, NatureRunRegistration } from "../types";
import { formatDateFull } from "./utils";

interface ShowdownOptionsExtended extends ConverterOptions {
  replaceVarsOptions?: {
    natureRunRegistration: NatureRunRegistration;
  };
}

function replaceDistance(
  template: string,
  natureRunRegistration: NatureRunRegistration
) {
  return template.replace(
    /{{natureRunRegistration.distance}}/g,
    natureRunRegistration.attributes.distance.data.attributes.label
  );
}

function replaceDate(template: string, natureRun: NatureRun) {
  return template.replace(
    /{{natureRun.date}}/g,
    formatDateFull(natureRun.attributes.date)
  );
}

showdown.extension("replaceVars", {
  type: "lang",
  filter(text, _, options?: ShowdownOptionsExtended) {
    if (options?.replaceVarsOptions) {
      return replaceDate(
        replaceDistance(text, options.replaceVarsOptions.natureRunRegistration),
        options.replaceVarsOptions.natureRunRegistration.attributes.natureRun
          .data!
      );
    }
    return text;
  },
});

export function parseNatureRunEmailContent(
  natureRunRegistration: NatureRunRegistration
) {
  const markdownToHtml = new showdown.Converter({
    simplifiedAutoLink: true,
    extensions: ["replaceVars"],
    replaceVarsOptions: {
      natureRunRegistration,
    },
  });
  return markdownToHtml.makeHtml(
    natureRunRegistration.attributes.natureRun.data.attributes.emailContent
  );
}

export function parseNatureRunEmailSubject(
  natureRunRegistration: NatureRunRegistration
) {
  return replaceDate(
    replaceDistance(
      natureRunRegistration.attributes.natureRun.data.attributes.emailSubject,
      natureRunRegistration
    ),
    natureRunRegistration.attributes.natureRun.data
  );
}
