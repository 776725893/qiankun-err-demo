import { defineStore } from "pinia";
import { ref } from "vue";
const useAppStore = defineStore("appStore", () => {
  const num = ref(0)
  /* 
      是否进行了路由初始化
    */
  const isInitAuthRoute = ref(false);
  // 更改路由初始化状态
  const changeInitStatus = (value = true) => {
    isInitAuthRoute.value = value;
  };

  /* 
      菜单列表
    */
  const menuList = ref([]);
  // 设置菜单列表
  const setMenu = (list) => {
    menuList.value = list;
  };

  return {
    isInitAuthRoute,
    changeInitStatus,
    menuList,
    setMenu,
    num
  };
});
export default useAppStore;
