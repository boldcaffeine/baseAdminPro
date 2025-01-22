import request from "@/utils/request.ts";

// 定义登录请求的数据类型
interface LoginData {
  username: string;
  password: string;
}

// 定义用户信息返回的数据类型
interface UserInfoData {
  roles: string[];
  name: string;
  avatar: string;
  introduction: string;
}

// 登录函数
export function login(data: LoginData): Promise<any> {
  return request({
    url: "/vue-element-admin/user/login",
    method: "post",
    data,
  });
}

// 获取用户信息
export function getInfo(token: string): Promise<UserInfoData> {
  return request({
    url: "/vue-element-admin/user/info",
    method: "get",
    params: { token },
  });
}

// 登出函数
export function logout(): Promise<any> {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}
