import Cookies from "js-cookie";

// 门店保存token的key值
const SSOTokenKey = "micro-token";

/**
 * @desc 获取门店token
 * @return string
 * @Author: kong
 */
export function getSSOToken(): string {
  return Cookies.get(SSOTokenKey) ?? "";
}

/**
 * @desc 设置门店token
 * @param {string} token 门店token
 * @return void
 * @Author: kong
 */
export function setSSOToken(token: string) {
  Cookies.set(SSOTokenKey, token);
}

/**
 * @desc 删除门店token
 * @return void
 * @Author: kong
 */
export function removeSSOToken() {
  Cookies.remove(SSOTokenKey);
}

/**
 * @desc 删除全部的缓存cookies
 * @return void
 * @Author: kong
 */
export function removeAllCache() {
  removeSSOToken();
}
