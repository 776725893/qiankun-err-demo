import { createApp, nextTick } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/router/permission";
import { createPinia } from "pinia";
import { registerStore } from "@/store";
import piniaPluginPersistedstate from "pinia-plugin-persist";
import "@/styles/index.scss";
import "nprogress/nprogress.css";
import "element-plus/theme-chalk/src/index.scss";
import { setTheme } from "./utils/theme";
// 注册微应用
import { registerMicroApps, start } from "qiankun";
import { getMicroApps } from "@/utils/microApps";
registerMicroApps(getMicroApps());
const app = createApp(App);
// 使用pinia和仓库持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
registerStore();
// 初始化主题
setTheme();
app.use(router).mount("#microApp");

start({
  sandbox: { strictStyleIsolation: false, experimentalStyleIsolation: false },
});
