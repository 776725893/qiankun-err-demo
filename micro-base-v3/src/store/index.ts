import useApp from "./app/app";
import useTab from "./tabs/tabs";
import useUser from "./user/user";

export interface IStore {
  appStore: ReturnType<typeof useApp>;
  tabStore: ReturnType<typeof useTab>;
  userStore: ReturnType<typeof useUser>;
}

const store: IStore = {} as IStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  store.appStore = useApp();
  store.tabStore = useTab();
  store.userStore = useUser();
};

export default store;
