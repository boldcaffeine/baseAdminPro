import Cookies from 'js-cookie';

interface SidebarState {
  opened: boolean;
  withoutAnimation: boolean;
}

interface State {
  sidebar: SidebarState;
  device: string;
  size: string;
}

const state: State = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
};

const mutations = {
  TOGGLE_SIDEBAR(state: State): void {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
  },
  CLOSE_SIDEBAR(state: State, withoutAnimation: boolean): void {
    Cookies.set('sidebarStatus', '0');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE(state: State, device: string): void {
    state.device = device;
  },
  SET_SIZE(state: State, size: string): void {
    state.size = size;
    Cookies.set('size', size);
  },
};

const actions = {
  toggleSideBar({ commit }: { commit: Function }): void {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }: { commit: Function }, { withoutAnimation }: { withoutAnimation: boolean }): void {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }: { commit: Function }, device: string): void {
    commit('TOGGLE_DEVICE', device);
  },
  setSize({ commit }: { commit: Function }, size: string): void {
    commit('SET_SIZE', size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
