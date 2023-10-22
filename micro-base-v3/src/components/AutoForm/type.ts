import type { Ref } from "vue";
export interface IProps {
  // 监听的form数据
  data: {
    [key: string]: any;
  };
  // 需要显示的item配置数组
  items: ItemOption[];
  // // 搜索、重置的节流时长
  throttleTime?: number;
  // label宽度
  labelWidth?: string;
  // 搜索按钮的文字
  searchText?: string;
  // 重置的按钮文字
  resetText?: string;
}
// 全部的item配置对象
export type ItemOption =
  | ItemInputOption
  | ItemCommonOption
  | ItemSelectOption
  | ItemSlotOption;

// item 通用配置
interface commonOption {
  filed: string;
  name: string;
  slot?: never;
  option?: {
    [key: string]: any;
  };
  listeners?: {
    [key: string]: Function;
  };
}
/**
 * @desc item 输入框配置对象
 * 默认  clearable、失焦去除左右空格
 */
interface ItemInputOption extends commonOption {
  type: "input";
  itemType?: "number";
}

// item 普通配置对象
interface ItemCommonOption extends commonOption {
  type: "date" | "switch";
}

/**
 * @desc item 下拉框配置对象
 * 默认  clearable
 */
interface ItemSelectOption extends commonOption {
  type: "select";
  data: any[] | Ref<any[]>;
  prop?: {
    label: string,
    value: string
  }
}

// item slot配置对象
interface ItemSlotOption {
  filed: string;
  type?: never;
  name: string;
  slot: string;
}
