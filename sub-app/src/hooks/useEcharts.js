import echarts from "@/utils/echarts";
import { onBeforeUnmount, unref, watch } from "vue";
import { useDebounceFn, useWindowSize } from "@vueuse/core";
import store from "~/store";
const { width, height } = useWindowSize();
// charts图标合集
const charts = [];
watch(
  [width, height, () => store?.appStore?.collapse],
  useDebounceFn(() => {
    charts.forEach((v) => v.resize());
  }, 500)
);
export default function (dom, option) {
  let myChart;
  //实例初始化
  const init = () => {
    if (myChart) return;
    const el = unref(dom);
    if (!el) return;
    myChart = echarts.init(el);
    charts.push(myChart);
  };
  //更新实例数据
  const update = (option) => {
    if (!myChart) init();
    myChart && myChart.setOption(option);
  };
  //删除实例
  const clear = () => {
    if (!myChart) return;
    const id = myChart.id;
    const index = charts.findIndex((v) => v.id == id);
    myChart && myChart.dispose();
    myChart = null;
    charts.splice(index, 1);
  };
  init();
  if (option) update(option);
  onBeforeUnmount(() => {
    clear();
  });
  return {
    update,
    clear,
  };
}
