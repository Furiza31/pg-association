import enUS from "@/i18n/en-US/common.json";
import frFR from "@/i18n/fr-FR/common.json";

export const enUsType = enUS;
export const frFrType = frFR;

export interface I18nType {
  locale: string;
  legacy: boolean;
  fallbackLocale: string;
  messages: {
    "en-US": typeof enUsType;
    "fr-FR": typeof frFrType;
  };
}
