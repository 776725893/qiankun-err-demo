import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import { initRoute, destroyRoute } from "./router";
import { createPinia } from "pinia";
import { registerStore } from "@/store";
import piniaPluginPersistedstate from "pinia-plugin-persist";
import "@/styles/index.scss";
import "nprogress/nprogress.css";
import "element-plus/theme-chalk/src/index.scss";
import { setTheme } from "./utils/theme";
import "animate.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { setSSOToken } from "@/utils/cookies";
import "@/router/permission";
// 创建
let app = createApp(App);
// 使用pinia和仓库持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
registerStore();
app.component("svg-icon", SvgIcon);

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("@/assets/svg", false, /\.svg$/);
// 加载目录下的所有的 svg 文件
requireAll(req);

// 第一次初始化
export async function bootstrap({ changeMicroPath }) {}

// 后续挂载
export async function mount({ container, getMicroToken, name }) {
  getMicroToken && setSSOToken(getMicroToken());
  container.querySelector("#app").style.height = "calc(100vh - 110px)";
  render(container.querySelector("#app"));
}

const render = (container) => {
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  app = createApp(App);
  initRoute(app);
  app.use(pinia);
  const appDom = container ? container : "#app";
  app.mount(appDom);
};

// 卸载
export async function unmount() {
  app.unmount();
  app._container.innerHTML = "";
  app = null;
  destroyRoute();
}

// 判断是否为乾坤环境，否则会报错
if (!window.__POWERED_BY_QIANKUN__) {
  setTheme();
  render(null);
}
