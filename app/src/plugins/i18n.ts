import enUS from "@/i18n/en-US/common.json";
import frFR from "@/i18n/fr-FR/common.json";
import { I18nType } from "@/types/i18nType";
import { createI18n } from "vue-i18n";

export const i18n = createI18n<I18nType, "en-US" | "fr-FR">({
  legacy: false,
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: {
    "en-US": enUS,
    "fr-FR": frFR,
  },
});
