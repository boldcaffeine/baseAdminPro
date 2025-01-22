import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: "/", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在请求头中添加 token（如果需要）
    const token = localStorage.getItem("token"); // 或者从 Vuex 获取 token
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可以对响应的数据做进一步处理
    return response.data;
  },
  (error: AxiosError) => {
    // 对响应错误做处理
    if (error.response) {
      // 服务器返回了错误响应
      const { status, data } = error.response;
      console.error(`请求错误: ${status}`, data);
    } else {
      // 请求时发生错误（如网络断开）
      console.error("请求错误", error.message);
    }
    return Promise.reject(error);
  },
);

export default service;
