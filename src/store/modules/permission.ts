import { asyncRoutes, constantRoutes } from "@/router";

// 定义角色类型
type Role = string;

// 路由元数据接口
interface RouteMeta {
  roles?: Role[];
}

// 路由对象类型
interface Route {
  path: string;
  component: any;
  children?: Route[];
  meta?: RouteMeta;
  hidden: boolean;
}

// 判断角色是否有权限访问某个路由
function hasPermission(roles: Role[], route: Route): boolean {
  // 强制断言 route.meta 存在
  if (route.meta?.roles) {
    // @ts-ignore
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}


// 根据角色过滤异步路由
export function filterAsyncRoutes(routes: Route[], roles: Role[]): Route[] {
  const res: Route[] = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

interface State {
  routes: Route[];
  addRoutes: Route[];
}

const state: State = {
  routes: [],
  addRoutes: [],
};

const mutations = {
  SET_ROUTES: (state: State, routes: Route[]) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};

const actions = {
  generateRoutes(
    { commit }: { commit: Function },
    roles: Role[]
  ): Promise<Route[]> {
    return new Promise((resolve) => {
      let accessedRoutes: Route[];
      if (roles.includes("admin")) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
