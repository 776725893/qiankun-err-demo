import type { IResRoute } from "@/types/base";

// 模拟接口获取路由数据
export function getRouteData() {
  return new Promise<IResRoute[]>((resolve, reject) => {
    resolve([
      {
        path: "/home",
        name: "home",
        component: "Home/index",
        meta: {
          noCache: true,
          title: "首页",
        },
      },
      {
        path: "/sub-cost",
        component: "SubApp/index",
        children: [
          {
            children: [],
            component: "contractWarding/list",
            hidden: false,
            meta: {
              icon: "leftMenu-client",
              noCache: true,
              title: "1",
            },
            name: "/sub-cost/contractWarding/list",
            path: "/sub-cost/contractWarding/list",
            redirect: "",
          },
          {
            children: [],
            component: "constructionContract/list",
            hidden: false,
            meta: {
              icon: "leftMenu-client",
              noCache: true,
              title: "2",
            },
            name: "/sub-cost/constructionContract/list",
            path: "/sub-cost/constructionContract/list",
            redirect: "",
          },
          {
            children: [],
            component: "constructionContractPay/list",
            hidden: false,
            meta: {
              icon: "leftMenu-client",
              noCache: true,
              title: "3",
            },
            name: "/sub-cost/constructionContractPay/list",
            path: "/sub-cost/constructionContractPay/list",
            redirect: "",
          },
          {
            children: [],
            component: "settlement/list",
            hidden: false,
            meta: {
              icon: "leftMenu-client",
              noCache: true,
              title: "4",
            },
            name: "/sub-cost/settlement/list",
            path: "/sub-cost/settlement/list",
            redirect: "",
          },
        ],
        meta: {
          noCache: true,
          title: "报价系统",
        },
      },
    ]);
  });
}
