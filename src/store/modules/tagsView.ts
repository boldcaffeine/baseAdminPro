interface View {
  path: string;
  name: string;
  meta: {
    title?: string;
    noCache?: boolean;
    affix?: boolean;
  };
}

interface State {
  visitedViews: View[];
  cachedViews: string[];
}

const state: State = {
  visitedViews: [],
  cachedViews: [],
};

const mutations = {
  ADD_VISITED_VIEW: (state: State, view: View): void => {
    if (state.visitedViews.some((v) => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || "no-name",
      }),
    );
  },
  ADD_CACHED_VIEW: (state: State, view: View): void => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  DEL_VISITED_VIEW: (state: State, view: View): void => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state: State, view: View): void => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) state.cachedViews.splice(index, 1);
  },

  DEL_OTHERS_VISITED_VIEWS: (state: State, view: View): void => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
  },
  DEL_OTHERS_CACHED_VIEWS: (state: State, view: View): void => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      state.cachedViews = [];
    }
  },

  DEL_ALL_VISITED_VIEWS: (state: State): void => {
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: (state: State): void => {
    state.cachedViews = [];
  },

  UPDATE_VISITED_VIEW: (state: State, view: View): void => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};

const actions = {
  addView({ dispatch }: any, view: View): void {
    dispatch("addVisitedView", view);
    dispatch("addCachedView", view);
  },
  addVisitedView({ commit }: any, view: View): void {
    commit("ADD_VISITED_VIEW", view);
  },
  addCachedView({ commit }: any, view: View): void {
    commit("ADD_CACHED_VIEW", view);
  },

  delView({ dispatch, state }: any, view: View): Promise<{ visitedViews: View[]; cachedViews: string[] }> {
    return new Promise((resolve) => {
      dispatch("delVisitedView", view);
      dispatch("delCachedView", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delVisitedView({ commit, state }: any, view: View): Promise<View[]> {
    return new Promise((resolve) => {
      commit("DEL_VISITED_VIEW", view);
      resolve([...state.visitedViews]);
    });
  },
  delCachedView({ commit, state }: any, view: View): Promise<string[]> {
    return new Promise((resolve) => {
      commit("DEL_CACHED_VIEW", view);
      resolve([...state.cachedViews]);
    });
  },

  delOthersViews({ dispatch, state }: any, view: View): Promise<{ visitedViews: View[]; cachedViews: string[] }> {
    return new Promise((resolve) => {
      dispatch("delOthersVisitedViews", view);
      dispatch("delOthersCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delOthersVisitedViews({ commit, state }: any, view: View): Promise<View[]> {
    return new Promise((resolve) => {
      commit("DEL_OTHERS_VISITED_VIEWS", view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersCachedViews({ commit, state }: any, view: View): Promise<string[]> {
    return new Promise((resolve) => {
      commit("DEL_OTHERS_CACHED_VIEWS", view);
      resolve([...state.cachedViews]);
    });
  },

  delAllViews({ dispatch, state }: any, view: View): Promise<{ visitedViews: View[]; cachedViews: string[] }> {
    return new Promise((resolve) => {
      dispatch("delAllVisitedViews", view);
      dispatch("delAllCachedViews", view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  delAllVisitedViews({ commit, state }: any): Promise<View[]> {
    return new Promise((resolve) => {
      commit("DEL_ALL_VISITED_VIEWS");
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews({ commit, state }: any): Promise<string[]> {
    return new Promise((resolve) => {
      commit("DEL_ALL_CACHED_VIEWS");
      resolve([...state.cachedViews]);
    });
  },

  updateVisitedView({ commit }: any, view: View): void {
    commit("UPDATE_VISITED_VIEW", view);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
