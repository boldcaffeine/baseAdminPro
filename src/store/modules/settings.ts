import defaultSettings from "@/settings";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

interface State {
  theme: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

const state: State = {
  theme: "#1890ff",
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

interface ChangeSettingPayload {
  key: keyof State;
  value: any;
}

const mutations = {
  CHANGE_SETTING: (state: State, { key, value }: ChangeSettingPayload) => {
    if (state.hasOwnProperty(key)) {
      // @ts-ignore
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }: { commit: Function }, data: ChangeSettingPayload) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
