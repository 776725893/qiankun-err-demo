import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {
  defaultHomePath,
  preTokenLoginName,
  preTokenLoginPathName,
} from "./constant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: defaultHomePath,
  },
  /* 携带token去往首页 */
  {
    name: preTokenLoginName,
    path: "/preTokenLogin",
    component: () => import("@/views/preTokenLogin.vue"),
  },
  /* 携带token去往指定页面 */
  {
    name: preTokenLoginPathName,
    path: "/preTokenLogin/toPath/:toPath(.*?)",
    component: () => import("@/views/preTokenLogin.vue"),
  },
  /* 路由中转 */
  {
    path: "/redirect/:path(.*)",
    name: "redirect",
    component: () => import("@/views/redirect.vue"),
  },
  /* 页面未找到 */
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      title: "页面未找到",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
