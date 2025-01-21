import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "normalize.css";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./sotre";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router)
app.use(store)
app.mount("#app");
