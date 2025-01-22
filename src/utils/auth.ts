import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

// 获取 token
export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}

// 设置 token
export function setToken(token: string): void {
  Cookies.set(TokenKey, token);
}

// 移除 token
export function removeToken(): void {
  Cookies.remove(TokenKey);
}
