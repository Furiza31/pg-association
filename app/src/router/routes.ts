import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "Landing",
    component: () => import("@/pages/Landing.vue"),
    meta: {
      noTransition: true,
      noAuth: true,
    },
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/pages/auth/Index.vue"),
    meta: {
      noTransition: true,
      noAuth: true,
    },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("@/pages/auth/Index.vue"),
    meta: {
      noTransition: true,
      noAuth: true,
    },
  },
  {
    path: "/app",
    component: () => import("@/components/base/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/pages/app/Dashboard.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/pages/app/settings/Index.vue"),
      },
      {
        path: "settings/language",
        name: "Language",
        component: () => import("@/pages/app/settings/Language.vue"),
      },
      {
        path: "users-management",
        name: "Users_Management",
        component: () => import("@/pages/app/users-management/Index.vue"),
      },
    ],
  },
];
