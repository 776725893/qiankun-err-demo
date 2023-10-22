import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import urlConfig from "~/urlConfig";
import { getSSOToken, removeAllCache } from "@/utils/cookies";
import type { IUserInfo } from "@/types/user";
const useUserStore = defineStore(
  "userStore",
  () => {
    /*
    用户信息
    */
    const userInfo = reactive<IUserInfo>({
      name: "",
      jobNumber: "",
      orgId: "",
      phone: "",
      permissions: [],
      accountList: [],
      activeAccount: {},
    });

    /**
     * @desc 初始化用户信息
     * @return Promise<void>
     * @Author: kong
     */
    function initUserInfo() {
      return Promise.resolve();
      const token = getSSOToken();
      const api = (token: string) => {
        return new Promise<void>((resolve, reject) => {
          resolve();
        });
      };
      return api(token).then((res) => {
        getPermission();
      });
    }

    /**
     * @desc 初始化用户信息后获取权限列表
     * @return Promise<void>
     * @Author: kong
     */
    function getPermission() {
      const api = () => {
        return new Promise<[]>((resolve, reject) => {
          resolve([]);
        });
      };
      return api().then((res) => {
        userInfo.permissions = res;
      });
    }

    /**
     * @desc 退出登录
     * @Author: kong
     */
    function logout() {
      removeAllCache();
      location.href = urlConfig.SSOLogin;
    }

    return { ...toRefs(userInfo), initUserInfo, logout };
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
          paths: [],
        },
      ],
    },
  }
);
export default useUserStore;
