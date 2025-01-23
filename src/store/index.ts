import { createStore } from "vuex";

import app from "./modules/app.ts";
import errorLog from "./modules/errorLog.ts";
import permission from "./modules/permission.ts";
import settings from "./modules/settings.ts";
import tagsView from "./modules/tagsView.ts";
import user from "./modules/user.ts";

import getters from "./getters/index.ts";

const store = createStore({
  modules: { app, errorLog, permission, settings, tagsView, user },
  getters,
});

export default store;
