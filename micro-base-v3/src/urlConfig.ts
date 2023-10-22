import type { IUrlOptions, IEnv } from "@/types/base";
const _ALL_URL_CONF: IUrlOptions = {
  dev: {
    // 请求接口地址
    baseUrl: "",
    // 登录地址
    SSOLogin: "",
    // 微应用地址
    "/sub-cost": "http://localhost:8080",
  },
  test: {
    // 请求接口地址
    baseUrl: "",
    // 登录地址
    SSOLogin: "",
    // 微应用地址
    "/sub-cost": "http://localhost:8080",
  },
  prod: {
    // 请求接口地址
    baseUrl: "",
    // 登录地址
    SSOLogin: "",
    // 微应用地址
    "/sub-cost": "http://localhost:8080",
  },
};

let env: IEnv = "prod";
const hostname: string = location.hostname;
if (hostname) {
  if (hostname.indexOf("-test") > 0) {
    env = "test";
  } else if (
    hostname.indexOf("-dev") > 0 ||
    hostname.indexOf("localhost") >= 0
  ) {
    env = "dev";
  }
}
console.log({ env });

export default _ALL_URL_CONF[env];
