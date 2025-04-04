import { historyService } from "@/services/history.service";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const historyMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const historyServiceInstance = historyService.getInstance();
  if (to.meta?.noAuth !== true) historyServiceInstance.push(to);
  next();
};
