// src/mock/mockService.js

import Mock from "mockjs";

// 模拟一个用户列表的 GET 请求
Mock.mock("/api/users", "get", {
  code: 200,
  message: "Success",
  data: Mock.mock({
    "users|5-10": [
      {
        // 生成 5 到 10 个用户
        "id|+1": 1,
        name: "@name",
        email: "@EMAIL",
        "age|18-60": 1,
      },
    ],
  }).users,
});

// 模拟登录的 POST 请求
Mock.mock("/api/login", "post", (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === "admin" && password === "1234") {
    return {
      code: 200,
      message: "Login successful",
      token: "fake-token",
    };
  } else {
    return {
      code: 401,
      message: "Invalid credentials",
    };
  }
});
