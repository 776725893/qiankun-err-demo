import http from "@/service/http";

const api: Api = {
  storeInAdd(params) {
    return http.post("/storage/in/add", params);
  },
};
export default api;

interface Api {
  //入库新增
  storeInAdd: (params: storeInAddParams) => Promise<any>;
}

//入库新增
export interface storeInAddParams {
  clientId: string;
  list: {
    productId: string;
    num: number;
  }[];
}
