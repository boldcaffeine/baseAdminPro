/// <reference types="vite/client" />
declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "element-plus/dist/locale/en.mjs";
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vuex" {
  export * from "vuex/types/index.d.ts";
  export * from "vuex/types/helpers.d.ts";
  export * from "vuex/types/logger.d.ts";
  export * from "vuex/types/vue.d.ts";
}
// types/cookies.d.ts
declare module "js-cookie" {
  const Cookies: any;
  export default Cookies;
}
