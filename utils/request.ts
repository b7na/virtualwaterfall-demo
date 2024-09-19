import axios from "axios";
import useStore from "element-plus/es/components/table/src/store";

const fetchRequest = async (
  url: string,
  method: string = "post",
  data: object | null,
  body:string,
) => {
  const options = {
    method,
    body,
    headers: {
        "Content-Type": "application/json",
    },
};
  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};

// 创建axios实例
const axiosRequest = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60000,
});

// 添加请求拦截器
axiosRequest.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    const token = localStorage.getItem("user-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 请求错误时做一些事
    console.error("请求配置错误:", error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosRequest.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
    // 对响应数据做点什么
    // return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      console.error("Server responded with:", error.response.status);
      switch (error.response.status) {
        case 401:
          // Unauthorized
          // 可以在这里处理未授权的情况，例如重新登录
          break;
        case 403:
          // Forbidden
          // 处理禁止访问的情况
          break;
        case 404:
          // Not Found
          // 处理资源未找到的情况
          break;
        default:
          console.error("Unknown server error:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosRequest, fetchRequest };
