import settings from "~/settings";

// PreTokenLogin的name
export const preTokenLoginName = "PreTokenLogin";

// PreTokenLoginPath的name
export const preTokenLoginPathName = "PreTokenLoginPath";

/**
 * @desc 默认路由(无需权限)和默认不在菜单中显示
 */
export const defaultRoute = [
  {
    path: "/",
    redirect: settings.defaultHomePath,
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
  /* 无权限 */
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/Error/401.vue"),
    meta: {
      title: "无权限",
    },
  },
];
