import { createRouter, createWebHashHistory } from "vue-router"; // 使用 createWebHistory

import HomeView from "@/views/home/index.vue";
import AboutView from "@/views/about/index.vue";

export const asyncRoutes = [];
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
];

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  {
    path: "/dashboard",
    component: () => import("@/views/dashboard/index.vue"),
    name: "Dashboard",
    meta: { title: "Dashboard", icon: "dashboard", affix: true },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 createWebHashHistory
  routes,
});

export function resetRouter() {}

export default router;
