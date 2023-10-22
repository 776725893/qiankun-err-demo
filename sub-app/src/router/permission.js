import NProgress from "nprogress";
import store from "@/store";
import { getSSOToken } from "@/utils/cookies";
import urlConfig from "~/urlConfig";
import { reLogin } from "@/service/http";
import { getRouters } from "@/service/auth/auth";
// 白名单正则
const whiteListRegex = [/^\/preTokenLogin(\/(toPath))?(\/(.*?))?/];

const loadView = (view) => {
  // 路由懒加载
  return () => require.ensure([], (require) => require(`@/views/${view}`));
};
// 后端数据转route数组
function handleDataToRoute(data) {
  const target = JSON.parse(JSON.stringify(data));
  return target.map((item, i) => {
    const route = {
      path: item.path,
      name: item.name,
      children: [],
      meta: item.meta ?? {},
    };
    if (item.children) route.children = handleDataToRoute(item.children);

    if (item.component) {
      if (item.component === "Layout") {
        route.component = loadView("Layout/index");
      } else {
        route.component = loadView(item.component);
      }
    }
    if (item.redirect) route.redirect = item.redirect;
    if (!route.children.length) delete route.children;
    return route;
  });
}

// 后端数据转menu数组
function handleDataToMenu(data, parentUrl) {
  const target = JSON.parse(JSON.stringify(data));
  return target.map((v) => {
    const curPath = v.path.startsWith("/") ? v.path : parentUrl + v.path;
    const menu = {
      path: curPath,
      hidden: !!v.hidden,
      meta: v.meta ?? {},
      hasChildren: !!v.children?.length,
      children: handleDataToMenu((v.children ?? []).filter((v) => !v.hidden)),
    };
    return menu;
  });
}

export function routerPlugins(router) {
  store.appStore.changeInitStatus(false);
  // 路由拦截器
  router.beforeEach((to, from, next) => {
    NProgress.start();
    const { appStore, userStore } = store;
    const { isInitAuthRoute, changeInitStatus } = appStore;
    if (whiteListRegex.some((item) => item.test(to.path))) {
      // 在免登录白名单，直接进入
      next();
    } else if (!getSSOToken() && false) {
      // 无token后的处理逻辑
      location.href = urlConfig.SSOLogin;
    } else if (!isInitAuthRoute) {
      const res = {
        body: [
          {
            alwaysShow: true,
            children: [
              {
                alwaysShow: false,
                children: [],
                component: "cost/settlement/list",
                hidden: false,
                meta: {
                  icon: "",
                  noCache: false,
                  title: "项目结算管理",
                },
                name: "/settlement/list",
                path: "/settlement/list",
                redirect: "",
              },
              {
                alwaysShow: false,
                children: [],
                component: "cost/contractWarding/list",
                hidden: false,
                meta: {
                  icon: "",
                  noCache: false,
                  title: "整装套餐核量发包",
                },
                name: "/contractWarding/list",
                path: "/contractWarding/list",
                redirect: "",
              },
              {
                alwaysShow: false,
                children: [],
                component: "cost/constructionContractPay/list",
                hidden: false,
                meta: {
                  icon: "",
                  noCache: false,
                  title: "请款单管理",
                },
                name: "/constructionContractPay/list",
                path: "/constructionContractPay/list",
                redirect: "",
              },
              {
                alwaysShow: false,
                children: [],
                component: "cost/constructionContract/list",
                hidden: false,
                meta: {
                  icon: "",
                  noCache: false,
                  title: "发包合同管理",
                },
                name: "/constructionContract/list",
                path: "/constructionContract/list",
                redirect: "",
              },
            ],
            component: "Layout",
            hidden: false,
            meta: {
              icon: "",
              noCache: false,
              title: "整装成本管理",
            },
            name: "",
            path: "/",
            redirect: "noRedirect",
          },
        ],
        head: {
          code: 0,
          ext: null,
          message: "",
          state: "success",
        },
        success: true,
      };
      const route = handleDataToRoute(res.body);
      route.forEach((v) => router.addRoute(v));
      const menu = handleDataToMenu(res.body);
      appStore.setMenu(menu);
      const path = to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      changeInitStatus();
      return;
      // 初始化用户信息
      userStore
        .initUserInfo()
        .then(() => {
          userStore.getPermission();
          getRouters()
            .then((res) => {
              const route = handleDataToRoute(res.body);
              route.forEach((v) => router.addRoute(v));
              //router.addRoute(route)
              console.log(router.getRoutes());
              const menu = handleDataToMenu(res.body);
              appStore.setMenu(menu);
              const path = to.fullPath;
              next({ path, replace: true, query: to.query, hash: to.hash });
            })
            .finally(() => {
              changeInitStatus();
            });
        })
        .catch(() => {
          reLogin("登录状态已过期，请重新登录");
        });
    } else {
      next();
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
