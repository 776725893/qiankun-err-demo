import type { ISubApp } from "@/types/base";
import urlConfig from "@/urlConfig";
import { getSSOToken } from "@/utils/cookies";
// 挂载容器的id
const microAppContainer: string = `#subApp`;

// 微应用列表
export const microApps: ISubApp[] = [
  {
    name: "成本系统",
    activeRule: "/sub-cost",
  },
];

// 获取乾坤微应用配置项
export function getMicroApps() {
  return microApps.map(({ name, activeRule }) => ({
    name,
    entry: urlConfig[activeRule],
    container: microAppContainer,
    activeRule(prop: any) {
      const pathname = String(prop.pathname);
      console.log(pathname, pathname.startsWith(activeRule));

      return pathname.startsWith(activeRule);
    },
    props: {
      // 去往父应用对应路由
      changeMicroPath(path: string) {
        history.pushState("", "", path);
      },
      // 获取token
      getMicroToken() {
        return getSSOToken();
      },
    },
  }));
}
