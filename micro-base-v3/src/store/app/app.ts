import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { IMenu } from "@/types/base";
const useAppStore = defineStore(
  "appStore",
  () => {
    /* 
      当前菜单折叠状态 true为折叠
    */
    const collapse = ref(false);
    // 切换菜单折叠状态
    const toggleCollapse = (value: boolean = !collapse.value) => {
      collapse.value = value;
    };

    /*
      是否显示tab view
     */
    const showTab = ref(true);

    /*
      是否为色弱模式
    */
    const colorWeakness = ref(false);
    watch(colorWeakness, (value) => {
      const body = document.querySelector("body");
      if (body) {
        body.style.filter = value ? "invert(80%)" : "";
      }
    });

    /* 
      是否进行了路由初始化
    */
    const isInitAuthRoute = ref(false);
    // 更改路由初始化状态
    const changeInitStatus = () => {
      isInitAuthRoute.value = true;
    };

    /* 
      菜单列表
    */
    const menuList = ref<IMenu[]>([]);
    // 设置菜单列表
    const setMenu = (list: IMenu[]) => (menuList.value = list);

    return {
      collapse,
      toggleCollapse,
      showTab,
      colorWeakness,
      isInitAuthRoute,
      changeInitStatus,
      menuList,
      setMenu,
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
          paths: ["collapse", "showTab", "colorWeakness"],
        },
      ],
    },
  }
);
export default useAppStore;
