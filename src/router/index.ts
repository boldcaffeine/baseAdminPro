import { createRouter, createWebHistory } from "vue-router";  // 使用 createWebHistory

import HomeView from "@/views/home/index.vue";
import AboutView from "@/views/about/index.vue";


export const asyncRoutes = []
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
]



const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),  // 使用 createWebHistory
  routes,
});

export function resetRouter() {
  
}

export default router;
