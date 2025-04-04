import { useAuth } from "@/services/auth.service";
import {
  NavigationGuardNext,
  RouteLocationNormalized,
  useRouter,
} from "vue-router";
import { toast } from "vue-sonner";

export const authMiddleware = async (
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const router = useRouter();

  if (to.meta.noAuth) {
    next();
    return;
  }

  next();

  useAuth()
    .isAuthenticated()
    .then((isAuthenticated) => {
      if (!isAuthenticated) {
        toast.error("You need to login to access this page");
        router.push({ name: "Login", replace: true });
      }
    });
};
