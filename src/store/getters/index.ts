// 定义各个模块的类型
interface AppState {
    sidebar: boolean;
    size: string;
    device: string;
  }
  
  interface TagsViewState {
    visitedViews: Array<any>;
    cachedViews: Array<any>;
  }
  
  interface UserState {
    token: string;
    avatar: string;
    name: string;
    introduction: string;
    roles: string[];
  }
  
  interface PermissionState {
    routes: Array<any>;
  }
  
  interface ErrorLogState {
    logs: Array<any>;
  }
  
  interface RootState {
    app: AppState;
    tagsView: TagsViewState;
    user: UserState;
    permission: PermissionState;
    errorLog: ErrorLogState;
  }
  
  // getters 的类型
  const getters = {
    sidebar: (state: RootState): boolean => state.app.sidebar,
    size: (state: RootState): string => state.app.size,
    device: (state: RootState): string => state.app.device,
    visitedViews: (state: RootState): Array<any> => state.tagsView.visitedViews,
    cachedViews: (state: RootState): Array<any> => state.tagsView.cachedViews,
    token: (state: RootState): string => state.user.token,
    avatar: (state: RootState): string => state.user.avatar,
    name: (state: RootState): string => state.user.name,
    introduction: (state: RootState): string => state.user.introduction,
    roles: (state: RootState): string[] => state.user.roles,
    permission_routes: (state: RootState): Array<any> => state.permission.routes,
    errorLogs: (state: RootState): Array<any> => state.errorLog.logs,
  };
  
  export default getters;
  