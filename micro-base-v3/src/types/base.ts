/**
 * @desc tab导航数组子项类型
 */
export interface TabType {
  tabKey: string;
  title: string;
  path: string;
  keepAlive: boolean;
  params: Object;
  query: Object;
  hash: string;
  componentName: string;
}

/**
 * @desc 后端路由返回的菜单数据类型
 */
export interface IResRoute {
  path: string;
  name?: string;
  redirect?: string;
  component?: string;
  hidden?: boolean;
  meta?: Record<string | number | symbol, unknown>;
  children?: IResRoute[];
}

/**
 * @desc 左侧菜单数组子项类型
 */
export interface IMenu {
  path: string;
  hidden: boolean;
  meta: Record<string | number | symbol, unknown>;
  hasChildren: boolean;
  children: IMenu[];
}

/**
 * @desc 环境类型
 */
export type IEnv = "dev" | "test" | "prod";

/**
 * @desc 环境所要请求的url的key值
 */
type IUrlKey = "baseUrl";

/**
 * @desc 环境所要登录的url的key值
 */
type ILoginKey = "SSOLogin";

/**
 * @desc 环境所要配置的微应用的key值
 */
export type ISubAppUrl = "/sub-cost";

/**
 * @desc url的配置对象
 */
export type IUrlOption = {
  [key in ISubAppUrl | IUrlKey | ILoginKey]: string;
};

/**
 * @desc 环境所要配置的微应用的key值
 */
export type IUrlOptions = {
  [key in IEnv]: IUrlOption;
};

/**
 * @desc 微应用列表的类型
 */
export type ISubApp = {
  name: string;
  activeRule: ISubAppUrl;
};
