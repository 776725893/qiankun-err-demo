import { authService } from "@/service/http";
import settings from "~/settings";
/** 
 获取用户信息接口
 */
export const getUserInfo = () => {
  return authService.get("/getUserInfo");
};

/** 
 获取权限列表
 */
export const getUserPermission = () => {
  return authService.get("/getPermission/" + settings.applicationId);
};

/** 
 获取路由列表
 */
 export const getRouters = () => {
  return authService.get("/menu/getRouters/" + settings.applicationId);
};

/** 
 退出登录
 */
export const logout = () => {
  return authService.post("/mdWeb/logout");
};