interface State {
  logs: string[];
}

const state: State = {
  logs: [],
};

const mutations = {
  ADD_ERROR_LOG: (state: State, log: string) => {
    state.logs.push(log);
  },
  CLEAR_ERROR_LOG: (state: State) => {
    state.logs.splice(0);
  },
};

const actions = {
  addErrorLog({ commit }: { commit: Function }, log: string) {
    commit("ADD_ERROR_LOG", log);
  },
  clearErrorLog({ commit }: { commit: Function }) {
    commit("CLEAR_ERROR_LOG");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
