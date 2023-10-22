import axios from "axios";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";
import urlConfig from "~/urlConfig";
import { getSSOToken, removeAllCache } from "@/utils/cookies";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 权限http
export const authService = createService({
  baseURL: urlConfig.authBase + '/auth',
  addToken: true,
});

// 通用http
export const commonService = createService({
  baseURL: "",
  addToken: true,
});

const errorCode = {
  401: "认证失败，无法访问系统资源",
  403: "当前操作没有权限",
  404: "访问资源不存在",
  default: "系统未知错误，请反馈给管理员",
};

/**
 * @desc 创建axios实例
 * @param {IAxiosOption} options 创建axios的配置对象
 * @return AxiosInstance
 * @Author: kong
 */
function createService(options) {
  const { baseURL, timeout, addToken } = options;
  // 创建axios实例
  const service = axios.create({
    baseURL,
    // 超时时间
    timeout: timeout || 10000,
  });

  // request拦截器
  service.interceptors.request.use(
    (config) => {
      // 是否添加token
      if (addToken) {
        const isToken = (config.headers || {}).isToken === false;
        if (getSSOToken() && !isToken) {
          config.headers["token"] = getSSOToken();
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  service.interceptors.response.use(
    (res) => {
      // 未设置状态码则默认成功状态
      const code = res?.code || res?.data?.code || res?.data?.head?.code || 200;
      const responseType = res?.request?.responseType;
      // 获取错误信息
      const msg =
        // @ts-ignore
        errorCode[code] ||
        res?.data?.msg ||
        res?.data?.head?.message ||
        errorCode["default"];
      // 失败code处理
      if ([401, 501, 10020].includes(code)) {
        return reLogin("登录状态已过期，请重新登录");
      } else if (code === 406) {
        return reLogin("该账号被其他设备操作登出，请重新登录", true);
      } else if (code === 500) {
        ElMessage({
          message: msg,
          type: "error",
        });
        return Promise.reject(new Error(msg));
      } else if (code !== 200 && code !== 1000) {
        ElNotification.error({
          title: msg,
        });
        return Promise.reject(res);
      } else {
        return responseType === "blob" ? res : res.data;
      }
    },
    (error) => {
      if (error?.response?.status == 401) reLogin("登录状态已过期，请重新登录");
      return Promise.reject(error);
    }
  );
  return service;
}

// 重新登录函数
export function reLogin(msg, openDialog = false) {
  if (openDialog) {
    ElMessageBox.alert(msg, "系统提示", {
      confirmButtonText: "重新登录",
      type: "warning",
    }).then(() => {
      removeAllCache();
      location.href = urlConfig.SSOLogin;
    });
  } else {
    location.href = urlConfig.SSOLogin;
  }
  return Promise.reject();
}
