import { createRouter, createWebHistory } from "vue-router";
import { defaultRoute } from "./constant";
import { routerPlugins } from "./permission";

let history = null;
let router = null;
export function initRoute(app) {
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? "/sub-cost" : "/");
  router = createRouter({
    history,
    routes: defaultRoute,
  });
  routerPlugins(router);
  app.use(router);
}

export function destroyRoute() {
  history.destroy();
  router = null;
}

export function getRouter() {
  return router;
}
