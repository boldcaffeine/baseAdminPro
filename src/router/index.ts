import { createRouter, createWebHistory } from "vue-router";  // 使用 createWebHistory

import HomeView from "@/views/home/index.vue";
import AboutView from "@/views/about/index.vue";

const routes = [
  { path: "/home", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),  // 使用 createWebHistory
  routes,
});

export default router;
