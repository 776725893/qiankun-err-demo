import { dayjs } from "element-plus";
import * as math from "mathjs";
import { ElMessage } from "element-plus";
/**
 * @desc 格式化日期
 * @param {string | undefined} template 格式化模板  https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {string | number | dayjs.Dayjs | Date | null | undefined} date 格式化对象
 * @return void
 * @Author: kong
 */
export function formatTime(template, date) {
  return dayjs(date).format(template);
}

/**
 * @desc 数字计算 解决精度问题
 * 用于加减乘除
 * @Author: kong
 */
export const mathTool = {
  // 加
  add(numberArr, start) {
    return Number(
      math.format(
        numberArr.reduce((pre, cur) => math.add(pre, cur), start),
        {
          precision: 14,
        }
      )
    );
  },
  // 减
  subtract(numberArr) {
    return Number(
      math.format(
        numberArr.reduce((pre, cur) => math.subtract(pre, cur)),
        {
          precision: 14,
        }
      )
    );
  },
  //  乘
  multiply(numberArr, start = 1) {
    return Number(
      math.format(
        numberArr.reduce((pre, cur) => math.multiply(pre, cur), start),
        {
          precision: 14,
        }
      )
    );
  },
  //  除
  divide(numberArr) {
    return Number(
      math.format(
        numberArr.reduce((pre, cur) => math.divide(pre, cur)),
        {
          precision: 14,
        }
      )
    );
  },
};

/**
 * @desc 过滤参数  有的接口 字段送undefined或者[]会报错需要过滤掉
 * @param {object} 需要过滤的对象
 * @param {boolean} 是否需要过滤空数组
 * @return object
 * @Author: kong
 */
export const filterParams = (object, filterArr = false) => {
  const res = {};
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const cur = object[key];
      if (filterArr && Array.isArray(cur) && !cur.length) {
      } else if (cur || cur === 0) {
        res[key] = object[key];
      }
    }
  }
  return res;
};

/**
 * @desc 对象转 url字符串拼接
 * @param {object} 需要转化的对象
 * @return string
 * @Author: kong
 */
export const toParams = (object, isStart = true) => {
  let res = isStart ? [] : [""];
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const cur = object[key];
      if (Array.isArray(cur)) {
        res.push(encodeURIComponent(`${key}=${cur.join(",")}`));
      } else {
        res.push(encodeURIComponent(`${key}=${cur}`));
      }
    }
  }
  return res.join("&");
};

/**
 * 导出文件
 */
export const downFileByPromise = (promise, fileName) => {
  return new Promise((resolve, reject) => {
    promise
      .then((res) => {
        const blob = res.data;
        let link = document.createElement("a");
        link.href = URL.createObjectURL(
          new Blob([blob], { type: "application/vnd.ms-excel" })
        );
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        ElMessage.success("导出成功!");
        resolve();
      })
      .catch(() => {
        reject();
        ElMessage.error("导出失败!");
      });
  });
};

/**
 * @desc 生成uuid
 * @return string
 * @Author: kong
 */
export function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
