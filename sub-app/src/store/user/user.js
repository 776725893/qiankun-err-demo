import { defineStore } from "pinia";
import { reactive, toRefs, ref } from "vue";
import urlConfig from "~/urlConfig";
import { removeAllCache } from "@/utils/cookies";
import {
  getUserInfo,
  logout as logoutFn,
  getUserPermission,
} from "@/service/auth/auth";
const useUserStore = defineStore(
  "userStore",
  () => {
    /*
    用户信息
    */
    const userInfo = reactive({
      name: "",
      roles: [],
      jobNumber: "",
      phone: "",
      orgId: "",
      accountList: [],
      activeAccount: {},
      positionName: '',
      companyName: '',
    });

    /**
      用户的权限列表
     */
    const permissionsArr = ref(new Set());

    /**
     * @desc 初始化用户信息
     * @return Promise<void>
     * @Author: kong
     */
    function initUserInfo() {
      return getUserInfo().then((res) => {
        const { accountList, activeAccount, userName, jobNumber, userPhone } =
          res.body;
        const target = {
          name: userName,
          roles: activeAccount?.roles || [],
          jobNumber: jobNumber,
          phone: userPhone,
          orgId: activeAccount?.orgId || "",
          accountList: accountList,
          activeAccount: activeAccount,
          positionName:activeAccount.positionName,
          companyName:activeAccount.companyName,
        };
        Object.assign(userInfo, target);
      });
    }

    /**
     * @desc 初始化用户信息后获取权限列表
     * @return Promise 权限code列表
     * @Author: kong
     */
    function getPermission() {
      return new Promise((resolve) => {
        getUserPermission()
          .then((res) => {
            permissionsArr.value = new Set(res.body);
          })
          .catch(() => {
            resolve();
          });
      });
    }

    /**
     * @desc 判断是否有权限
     * @param {string[]}  需要判断是否有权限的arr（包含其中一个、或者为空数组则代表有权限）
     * @return boolean true则有权限 false无权限
     * @Author: kong
     */
    function getHasAuth(auth) {
      if (!auth.length) return true;
      return auth.some((v) => permissionsArr.value.has(v));
    }

    /**
     * @desc 退出登录
     * @Author: kong
     */
    function logout() {
      logoutFn().then(() => {
        removeAllCache();
        location.href = urlConfig.SSOLogin;
      });
    }

    return {
      ...toRefs(userInfo),
      initUserInfo,
      logout,
      permissionsArr,
      getPermission,
      getHasAuth
    };
  },
);
export default useUserStore;
