import { enUsType, frFrType } from "@/types/i18nType";
import { useI18n } from "vue-i18n";

export const useTranslation = () => {
  return useI18n<{
    message: typeof enUsType | typeof frFrType;
  }>({
    useScope: "global",
  });
};
