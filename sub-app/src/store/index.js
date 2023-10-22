import useApp from "./app/app";
import useTab from "./tabs/tabs";
import useUser from "./user/user";

const store = {};

/**
 * 注册app状态库
 */
export const registerStore = () => {
  store.appStore = useApp();
  store.tabStore = useTab();
  store.userStore = useUser();
};

export default store;
