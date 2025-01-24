import { createRouter, createWebHashHistory,type Router } from "vue-router"; // 使用 createWebHistory

import HomeView from "@/views/home/index.vue";
import AboutView from "@/views/about/index.vue";

export const constantRoutes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/layout", component: () => import("@/layout/index.vue") },

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

export const asyncRoutes = [];

// Initialize Router
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

// Function to reset router
export function resetRouter() {
  // Remove all routes
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });

  // Add constant routes back
  constantRoutes.forEach((route) => {
    router.addRoute(route);
  });
}

export default router;
