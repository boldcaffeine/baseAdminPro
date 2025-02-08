/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Date | string | number)} time
 * @param {string} [cFormat]
 * @returns {string | null}
 */
export function parseTime(
  time: Date | string | number,
  cFormat?: string
): string | null {
  if (!time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date: Date;

  if (time instanceof Date) {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time, 10);
      } else {
        time = time.replace(/-/g, "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time *= 1000;
    }
    date = new Date(time);
  }

  const formatObj: { [key: string]: number | string } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value as number];
    }
    return value.toString().padStart(2, "0");
  });
  return timeStr;
}

/**
 * @param {number} time
 * @param {string} [option]
 * @returns {string}
 */
export function formatTime(time: number, option?: string): string {
  if (time.toString().length === 10) {
    time *= 1000;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d.getTime()) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }

  if (option) {
    return parseTime(time, option) as string;
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Record<string, string>}
 */
export function getQueryObject(url: string): Record<string, string> {
  url = url || window.location.href;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj: Record<string, string> = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    const val = decodeURIComponent($2);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} str
 * @returns {number}
 */
export function byteLength(str: string): number {
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array<any>} actual
 * @returns {Array<any>}
 */
export function cleanArray(actual: any[]): any[] {
  return actual.filter((item) => !!item);
}

/**
 * @param {Record<string, any>} json
 * @returns {string}
 */
export function param(json: Record<string, any>): string {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

/**
 * @param {string} url
 * @returns {Record<string, string>}
 */
export function param2Obj(url: string): Record<string, string> {
  const search = decodeURIComponent(url.split("?")[1] || "").replace(
    /\+/g,
    " "
  );
  if (!search) {
    return {};
  }
  const obj: Record<string, string> = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val: string): string {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText || "";
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Record<string, any>} target
 * @param {Record<string, any> | Array<any>} source
 * @returns {Record<string, any>}
 */
export function objectMerge(
  target: Record<string, any>,
  source: Record<string, any> | any[]
): Record<string, any> {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element: HTMLElement, className: string): void {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += " " + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date | number}
 */
export function getTime(type: string): Date | number {
  if (type === "start") {
    return Date.now() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} [immediate]
 * @returns {(...args: any[]) => any}
 */
export function debounce(
  func: (...args: any[]) => any,
  wait: number,
  immediate?: boolean
): (...args: any[]) => any {
  let timeout: number | null = null;
  let args: any[] | null;
  let context: any;
  let timestamp: number;
  let result: any;

  const later = function () {
    const last = Date.now() - timestamp;
    if (last < wait && last > 0) {
      timeout = window.setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        // @ts-ignore
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args: any[]) {
    // @ts-ignore
    context = this;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = window.setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      // @ts-ignore
      context = args = null;
    }
    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge case bugs
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {any} source
 * @returns {any}
 */
export function deepClone<T>(source: T): T {
  if (!source || typeof source !== "object") {
    throw new Error("Invalid argument for deepClone");
  }
  const targetObj: any = Array.isArray(source) ? [] : {};
  Object.keys(source).forEach((key) => {
    const value = (source as any)[key];
    targetObj[key] = typeof value === "object" ? deepClone(value) : value;
  });
  return targetObj;
}

/**
 * @param {Array<any>} arr
 * @returns {Array<any>}
 */
export function uniqueArr(arr: any[]): any[] {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString(): string {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor((1 + Math.random()) * 65536).toString();
  return parseInt(randomNum + timestamp, 10).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
  return ele.className.split(" ").includes(cls);
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string): void {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string): void {
  if (hasClass(ele, cls)) {
    ele.className = ele.className
      .replace(new RegExp(`\\b${cls}\\b`, "g"), "")
      .trim();
  }
}
