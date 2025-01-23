import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "normalize.css";
import "element-plus/dist/index.css";
import "./globalStyles/index.scss"; // global css
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue';

const app = createApp(App);
app.component('SvgIcon', SvgIcon);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router)
app.use(store)
app.mount("#app");
