import router from "@/router";
import NProgress from "nprogress";
import store from "@/store";
import { RouteRecordRaw } from "vue-router";
import BlankComp from "@/views/blank.vue";
import type { IMenu, IResRoute } from "@/types/base";
import { getRouteData } from "./api";
import { getSSOToken } from "@/utils/cookies";
import urlConfig from "~/urlConfig";
// 注册的组件..
const comps = import.meta.glob("../views/**/*.vue");
// 白名单正则
const whiteListRegex = [/^\/preTokenLogin(\/(toPath))?(\/(.*?))?/];
// 路由拦截器
router.beforeEach((to, from, next) => {
  NProgress.start();
  const { appStore, userStore } = store;
  const { isInitAuthRoute, changeInitStatus } = appStore;
  const go = (option?: any) => {
    if (!window.history.state.current)
      window.history.state.current = to.fullPath;
    if (!window.history.state.back) window.history.state.back = from.fullPath;
    next(option);
  };
  if (whiteListRegex.some((item) => item.test(to.path))) {
    // 在免登录白名单，直接进入
    go();
  } else if (!isInitAuthRoute) {
    // 初始化用户信息
    userStore
      .initUserInfo()
      .then(() => {
        // 路由初始化
        getRouteData()
          .then((res) => {
            // 后端数据转路由
            const route = handleDataToRoute(res);
            route.forEach((v) => router.addRoute(v));
            // 后端数据转菜单
            const menu = handleDataToMenu(res);
            appStore.setMenu(menu);
            // 路由未初始化时  路径可能被识别未notFound  需要重新跳转
            const path = to.fullPath;
            go({ path, replace: true, query: to.query, hash: to.hash });
          })
          .finally(() => {
            changeInitStatus();
          });
      })
      .catch(() => {
        console.warn("token无效");
      });
  } else {
    go();
  }
});
router.afterEach(() => {
  NProgress.done();
});

// 路由懒加载
const loadView = async (view: string) => {
  const match: () => Promise<any> = comps[`../views/${view}.vue`];
  return (await match()).default;
};

// 后端数据转route数组
function handleDataToRoute(data: IResRoute[], isSub = false): RouteRecordRaw[] {
  const target: IResRoute[] = JSON.parse(JSON.stringify(data));
  return target.map((item, i) => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      children: [],
      meta: item.meta ?? {},
    };
    if (item.children)
      route.children = handleDataToRoute(
        item.children,
        (isSub = isSub || item.path.startsWith("/sub-"))
      );
    if (item.component && !isSub) {
      if (item.component === "Layout") {
        route.component = () => loadView("Layout/index");
      } else {
        route.component = () => loadView(item.component as string);
      }
    }
    if (isSub) {
      if (item.component) route.component = BlankComp;
      //route.path = "/sub-cost" + route.path;
    }
    if (item.redirect) route.redirect = item.redirect;
    // @ts-ignore
    if (!route.children.length) delete route.children;
    return route;
  });
}

// 后端数据转menu数组
function handleDataToMenu(data: IResRoute[], parentUrl?: ""): IMenu[] {
  const target: IResRoute[] = JSON.parse(JSON.stringify(data));
  return target.map((v) => {
    const curPath = v.path.startsWith("/") ? v.path : parentUrl + v.path;
    const menu: IMenu = {
      path: curPath,
      hidden: !!v.hidden,
      meta: v.meta ?? {},
      hasChildren: !!v.children?.length,
      children: handleDataToMenu((v.children ?? []).filter((v) => !v.hidden)),
    };
    return menu;
  });
}
