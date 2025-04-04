import { i18n } from "@/plugins/i18n";
import { nextTick } from "vue";
import { RouteLocationNormalized } from "vue-router";

export const titleMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized
) => {
  const { t } = i18n.global;
  nextTick(() => {
    document.title =
      import.meta.env.VITE_APP_TITLE + " - " + t(to.name?.toString() as string);
  });
};
