import { authMiddleware } from "@/router/middlewares/auth.middleware";
import { historyMiddleware } from "@/router/middlewares/history.middleware";
import { titleMiddleware } from "@/router/middlewares/title.middleware";
import { routes } from "@/router/routes";
import { createRouter, createWebHistory, Router } from "vue-router";

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authMiddleware);
router.beforeEach(historyMiddleware);

router.afterEach(titleMiddleware);

export { router };
