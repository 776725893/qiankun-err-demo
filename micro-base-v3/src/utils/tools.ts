import { dayjs } from "element-plus";

/**
 * @desc 格式化日期
 * @param {string | undefined} template 格式化模板  https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {string | number | dayjs.Dayjs | Date | null | undefined} date 格式化对象
 * @return void
 * @Author: kong
 */
export function formatTime(
  template?: string | undefined,
  date?: string | number | dayjs.Dayjs | Date | null | undefined
): string {
  return dayjs(date).format(template);
}
