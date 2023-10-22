// props类型
export type IProps = INormalProp | IProxyProp;

// 通用表格prop类型
interface INormalProp {
  // 列配置
  columns: IColumn[];
  // 表格数据
  data: any[];
  // 是否显示loading
  loading?: boolean;
  getData?: never;
  pagination?:never
}

// 数据代理的prop类型
interface IProxyProp {
  // 列配置
  columns: IColumn[];
  // 是否显示loading
  loading?: boolean;
  // 表格数据
  getData: (params: { pageNum: number; pageSize: number }) => Promise<{
    data: any[];
    total?: number;
  }>;
  data?: never;
  pagination?: boolean;
  defaultPageNo?: number;
  defaultPageSize?: number;
}

// col类型
export type IColumn =
  | IBaseCol
  | ICommonCol
  | ISlotCol
  | ICompleteSlotCol
  | ICallbackCol;

// 复选框、序列、展开的col类型
interface IBaseCol {
  type: "selection" | "index" | "expand";
  align?: "left" | "center" | "right";
  fixed?: true | "left" | "right";
  width?: string | number;
  completeSlot?: never;
  slotName?: never;
}

// 正常渲染的col类型
interface ICommonCol {
  label: string;
  prop: string;
  type?: never;
  align?: "left" | "center" | "right";
  fixed?: true | "left" | "right";
  width?: string | number;
  tooltip?: true | false;
  completeSlot?: never;
  slotName?: never;
  callback?: never;
}

// 内容slot的col类型
interface ISlotCol {
  label: string;
  slotName: string;
  type?: never;
  align?: "left" | "center" | "right";
  fixed?: true | "left" | "right";
  width?: string | number;
  tooltip?: true | false;
  completeSlot?: never;
  callback?: never;
}

// 完全slot的col类型
interface ICompleteSlotCol {
  slotName: string;
  completeSlot: true;
  type?: never;
  width?: never;
  align?: never;
  callback?: never;
}

// 内容callback的col类型
interface ICallbackCol {
  label: string;
  callback: Function;
  type?: never;
  align?: "left" | "center" | "right";
  fixed?: true | "left" | "right";
  width?: string | number;
  tooltip?: true | false;
  completeSlot?: never;
  slotName?: never;
}
