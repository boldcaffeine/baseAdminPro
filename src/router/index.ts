import { createRouter, createWebHashHistory, type Router } from "vue-router"; // 使用 createWebHistory

import Layout from "@/layout/index.vue";

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/about/index.vue"),
        name: "Documentation",
        meta: { title: "Documentation", icon: "documentation", affix: true },
      },
    ],
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
