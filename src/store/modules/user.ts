import { login, logout, getInfo } from "@/api/user.ts";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";
import type { ActionContext } from "vuex";

// 定义根状态类型
export interface RootState {
  user: {
    token: string | null;
    name: string;
    avatar: string;
    introduction: string;
    roles: string[];
  };
  // 可以根据需要添加其他模块的状态
}

interface UserState {
  token: string | undefined;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}
interface UserTokenData {
  data: {
    token: string;

  };
}

const state: UserState = {
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
};
interface UserInfoResponse {
  data: {
    roles: string[];
    name: string;
    avatar: string;
    introduction: string;
  };
}

const mutations = {
  SET_TOKEN(state: UserState, token: string) {
    state.token = token;
  },
  SET_INTRODUCTION(state: UserState, introduction: string) {
    state.introduction = introduction;
  },
  SET_NAME(state: UserState, name: string) {
    state.name = name;
  },
  SET_AVATAR(state: UserState, avatar: string) {
    state.avatar = avatar;
  },
  SET_ROLES(state: UserState, roles: string[]) {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login(
    { commit }: ActionContext<UserState, RootState>,
    userInfo: { username: string; password: string }
  ): Promise<void> {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response:UserTokenData) => {
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }: ActionContext<UserState, RootState>): Promise<any> {
    return new Promise((resolve, reject) => {
      getInfo(state.token as string)
        .then((response:any) => {
          const { data } = response;
  
          if (!data) {
            reject("Verification failed, please Login again.");
          }
  
          const { roles, name, avatar, introduction } = data;
  
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo: roles must be a non-null array!");
          }
  
          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  

  // user logout
  logout(
    { commit, state, dispatch }: ActionContext<UserState, RootState>
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();

          // reset visited views and cached views
          dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }: ActionContext<UserState, RootState>): Promise<void> {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles(
    { commit, dispatch }: ActionContext<UserState, RootState>,
    role: string
  ): Promise<void> {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoute(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
