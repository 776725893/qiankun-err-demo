import { defineStore } from "pinia";
import { computed, nextTick, ref } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { defaultHomePath } from "@/router/constant";
import router from "@/router";
import type { TabType } from "@/types/base";
// 默认的tab(无法关闭)
const defaultTab: TabType = {
  tabKey: defaultHomePath,
  title: "首页",
  path: defaultHomePath,
  keepAlive: false,
  params: {},
  query: {},
  hash: "",
  componentName: "HomeView",
};
// 不保存tab的路由
const noTabPath = ["/redirect", "/preTokenLogin"];
const useStore = defineStore(
  "tabsStore",
  () => {
    // 当前显示的tabs
    const tabs = ref<TabType[]>([defaultTab]);

    // 当前激活的tab的tabKey
    const activeTabKey = ref<string>(defaultHomePath);

    // 重新加载flag
    const refreshFlag = ref(false);

    /**
     * @desc 添加tab/刷新tab
     * @param {RouteLocationNormalizedLoaded} route 当前路由的route
     * @return void
     * @Author: kong
     */
    function addTabs(route: RouteLocationNormalizedLoaded) {
      const { path, query, params, hash, matched, fullPath } = route;
      if (!matched.length || noTabPath.some((v) => path.startsWith(v))) return;
      // 当前匹配的路由数据
      const routeMatch = matched[matched.length - 1];
      // 当前匹配到的的组件实例
      const componentDef = routeMatch?.components?.default;
      // 当前的组件名称
      const componentName = String(componentDef?.name || routeMatch.name || "");
      // meta
      const meta = routeMatch.meta;
      // 标签title
      const title = String(meta.title || "title NotFound");
      // 是否缓存
      const keepAlive = !Boolean(meta.noCache ?? true);
      // 当前标签的key
      const tabKey = routeMatch.path;
      // 获取是否已经有tab
      const tab = getTabByKey(tabKey);
      // 清除keepAlive缓存
      if (tab && tab.path !== path) tab.keepAlive = false;
      activeTabKey.value = tabKey;
      const newTab = {
        tabKey,
        title: tab ? tab.title : title,
        keepAlive,
        path: fullPath,
        params,
        query,
        hash,
        componentName,
      };
      const cb = () => {
        tab ? Object.assign(tab, newTab) : tabs.value.push(newTab);
      };
      tab && keepAlive ? setTimeout(cb) : cb();
    }

    /**
     * @desc 通过tabKey获取tab
     * @param {string} tabKey 操作的tab的key值
     * @return undefined || TabType
     * @Author: kong
     */
    function getTabByKey(tabKey: string = "") {
      if (!tabKey) return;
      return tabs.value.find((v) => v.tabKey === tabKey);
    }

    /**
     * @desc 通过tabKey获取tab的索引
     * @param {string} tabKey 操作的tab的key值
     * @return undefined || TabType
     * @Author: kong
     */
    function getIndexByKey(tabKey: string = ""): number {
      if (!tabKey) return -1;
      return tabs.value.findIndex((v) => v.tabKey === tabKey);
    }

    /**
     * @desc 根据tabKey去往对应页面
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    async function toTabByKey(tabKey: string) {
      if (!tabKey || tabKey === activeTabKey.value) return;
      const tab = getTabByKey(tabKey);
      tab && (await router.push(tab.path));
    }

    /**
     * @desc 根据tabKey刷新页面
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    async function refreshTabByKey(tabKey: string) {
      if (!tabKey) return;
      if (tabKey !== activeTabKey.value) toTabByKey(tabKey);
      const tab = getTabByKey(tabKey);
      if (!tab) return;
      const isSub = tab.path.startsWith("/sub-");
      if (isSub) {
        router.push("/redirect" + tab.path);
      } else {
        const preStatus = tab.keepAlive;
        refreshFlag.value = true;
        tab.keepAlive = false;
        nextTick(() => {
          refreshFlag.value = false;
          tab.keepAlive = preStatus;
        });
      }
    }

    /**
     * @desc 根据tabKey关闭页面
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function closeTabByKey(tabKey: string) {
      const index = getIndexByKey(tabKey);
      if (index !== -1) {
        tabs.value.splice(index, 1);
        refreshActive();
      }
    }

    /**
     * @desc 根据tabKey关闭左侧
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function closeLeftByKey(tabKey: string) {
      const index = getIndexByKey(tabKey);
      if (index !== -1) {
        tabs.value = tabs.value.filter(
          (tab, i) => i >= index || tab.tabKey === defaultHomePath
        );
        refreshActive(tabKey);
      }
    }

    /**
     * @desc 根据tabKey关闭右侧
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function closeRightByKey(tabKey: string) {
      const index = getIndexByKey(tabKey);
      if (index !== -1) {
        tabs.value = tabs.value.filter(
          (tab, i) => i <= index || tab.tabKey === defaultHomePath
        );
        refreshActive(tabKey);
      }
    }

    /**
     * @desc 关闭全部
     * @return void
     * @Author: kong
     */
    function closeAll() {
      tabs.value = tabs.value.filter((tab) => tab.tabKey === defaultHomePath);
      refreshActive();
    }

    /**
     * @desc 根据tabKey关闭其他
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function closeOther(tabKey: string) {
      tabs.value = tabs.value.filter(
        (tab) => tab.tabKey === defaultHomePath || tab.tabKey === tabKey
      );
      refreshActive(tabKey);
    }

    /**
     * @desc 关闭tab后刷新对应的tabKey和去往页面
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function refreshActive(target?: string) {
      if (target === activeTabKey.value) return;
      const tab = getTabByKey(target);
      if (tab && target) {
        toTabByKey(target);
      } else {
        const tab = tabs.value[tabs.value.length - 1];
        toTabByKey(tab.tabKey);
      }
    }

    /**
     * @desc 根据tabKey更改tab的标题
     * @param {string} title 更改后显示的标题
     * @param {string} tabKey 操作的tab的key值
     * @return void
     * @Author: kong
     */
    function changeTitleByKey(
      title: string,
      tabKey: string = activeTabKey.value
    ) {
      const tab = getTabByKey(tabKey);
      if (!tab) return;
      tab.title = title;
    }

    // 在tabsView中显示的列表
    const tabsList = computed(() => {
      return tabs.value.map((v) => ({
        key: v.tabKey,
        title: v.title,
        closable: v.tabKey !== defaultHomePath,
      }));
    });

    // keepAlive的缓存列表
    const cacheArr = computed(() => {
      return tabs.value.filter((v) => v.keepAlive).map((v) => v.componentName);
    });

    return {
      tabs,
      activeTabKey,
      refreshFlag,
      tabsList,
      cacheArr,
      addTabs,
      toTabByKey,
      refreshTabByKey,
      closeTabByKey,
      closeLeftByKey,
      closeRightByKey,
      closeAll,
      closeOther,
      changeTitleByKey,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          // 自定义存储的 key，默认是 store.$id
          //key: "custom storageKey",
          // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
          //storage: localStorage,
          // state 中的字段名，按组打包储存
          paths: ["tabs", "activeTabKey"],
        },
      ],
    },
  }
);
export default useStore;
