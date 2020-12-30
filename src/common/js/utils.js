import { JS_TYPE } from "@/common/js/config";

export function now() {
  return +new Date();
}

export function toString(val) {
  return val + "";
}

export function toNumber(type, val) {
  switch (type) {
    case 1:
      return parseInt(val, 10);
    case 2:
      return parseFloat(val, 10);
    default:
      return val - 0;
  }
}

export function toBoolean(val) {
  switch (val) {
    case "true": {
      return true;
    }
    case "false": {
      return false;
    }
    default: {
      return !!val;
    }
  }
}

function isType(val, type) {
  return Object.prototype.toString.call(val) === type;
}

export function isNaN(val) {
  // eslint-disable-next-line no-self-compare
  return Number.isNaN ? Number.isNaN(val) : val !== val;
}

export function isNull(val) {
  return isType(val, JS_TYPE.NULL) || (!val && typeof val === "object");
}

export function isObject(val) {
  return (
    (isType(val, JS_TYPE.OBJECT) || typeof val === "function") && !isNull(val)
  );
}

export function isArray(val) {
  return isType(val, JS_TYPE.ARRAY);
}

export function isDate(val) {
  return isType(val, JS_TYPE.DATE);
}

// -0
export function isNegZero(val) {
  return val === 0 && 1 / val === -Infinity;
}

export function isFloat(x) {
  return Number.isFinite(x) && !Number.isInteger(x);
}

export function isDef(val) {
  return val !== "" && val !== void 0 && !isNull(val)
    ? isArray(val)
      ? !!val.length
      : true
    : false;
}

export function encode(param) {
  const arr = [];
  const keys = Reflect.ownKeys(param);
  keys.forEach(key => {
    const val = param[key];
    if (!key.includes("_") && isDef(val)) {
      arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    }
  });
  return arr.join("&");
}

export function setPrefix(prefix, param) {
  const obj = {};
  const keys = Reflect.ownKeys(param);
  keys.forEach(key => {
    const val = param[key];
    if (!key.includes("_") && isDef(val)) {
      obj[prefix + key] = val;
    }
  });
  return obj;
}

export function deepCopy(source = {}) {
  let target = "";
  if (typeof source === "object") {
    const allKeys = Reflect.ownKeys(source);
    target = Array.isArray(source) ? [] : {};

    allKeys.forEach(key => {
      const val = source[key];
      if (key.includes("_")) return;
      if (typeof val === "object" && !isNull(val)) {
        target[key] = deepCopy(val);
      } else {
        target[key] = val;
      }
    });
  } else {
    target = source;
  }
  return target;
}

/**
 *
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 * 如果一直触发这个函数，且每次触发函数的间隔小于wait，只会调用一次
 */
export function debounce(func, wait = 50, immediate = true) {
  let timer, context, args;

  const later = () =>
    setTimeout(() => {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
        context = args = null;
      }
    }, wait);

  return function(...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        func.apply(context, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
}

/**
 *
 * @param {function} func
 * @param {number} wait
 * @param {object} options 如果想忽略开始函数的的调用，传入{leading: false}。
 *                         如果想忽略结尾函数的调用，传入{trailing: false}
 *                         两者不能共存，否则函数不能执行
 * 每隔一定时间（参数wait）调用函数。
 */
export function throttle(func, wait = 50, options = {}) {
  let context, args, result;
  let timeout = null;

  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function() {
    const date = now();
    if (!previous && options.leading === false) previous = date;
    const remaining = wait - (date - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = date;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export function asyncify(fn) {
  var orig_fn = fn,
    intv = setTimeout(function() {
      intv = null;
      if (fn) fn();
    }, 0);
  fn = null;
  return function() {
    // 触发太快，在定时器intv触发指示异步转换发生之前?
    if (intv) {
      fn = orig_fn.bind.apply(
        orig_fn,
        // 把封装器的this添加到bind(..)调用的参数中，
        // 以及克里化(currying)所有传入参数
        [this].concat([].slice.call(arguments))
      );
      // eslint-disable-next-line brace-style
    }
    // 已经是异步
    else {
      // 调用原来的函数
      orig_fn.apply(this, arguments);
    }
  };
}

export function deepClone(obj) {
  if (obj !== undefined && obj !== null) {
    let str,
      newObj = obj.constructor === Array ? [] : {};
    if (obj && typeof obj !== "object") {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj);
      newObj = JSON.parse(str);
    } else {
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          newObj[i] =
            typeof obj[i] === "object" ? this.deepClone(obj[i]) : obj[i];
        }
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

export function cheekNumber(val) {
  if (val) {
    const re = /^-?\d+$|^-?\d+\.*\d+$/;
    return re.test(val);
  } else {
    return true;
  }
}

export function rgbToHex(rgb) {
  // rgb(x, y, z)
  const color = rgb.toString().match(/\d+/g);
  let hex = "#";
  for (let i = 0; i < 3; i++) {
    hex += ("0" + Number(color[i]).toString(16)).slice(-2);
  }
  return hex;
}

/**
 * 清空对象值，bool为false，string和number为空串
 * deep时数组元素只处理数组和对象类型
 * @param obj
 * @param deep
 * @param log
 */
export function clearObject(obj, deep = false, log = false) {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    const type = typeof value;
    if (value !== null) {
      if (Array.isArray(value)) {
        if (deep && value.length > 0) {
          obj[key] = value.filter(
            ele => typeof ele === "object" || Array.isArray(ele)
          );
          obj[key].forEach(ele => clearObject(ele, deep));
        } else {
          obj[key] = [];
        }
      } else if (type === "boolean") {
        obj[key] = false;
      } else if (type === "object") {
        if (deep && value) {
          clearObject(obj[key], deep);
        } else {
          obj[key] = {};
        }
      } else if (type === "number") {
        obj[key] = 0;
      } else {
        obj[key] = "";
      }
    }
    if (log) {
      console.log(`reset ${key}:`);
      console.log(value);
      console.log("to");
      console.log(obj[key]);
      console.log("---------------------");
    }
  });
}

export function getLength(str) {
  // 获得字符串实际长度，中文2，英文1
  let realLength = 0,
    // eslint-disable-next-line prefer-const
    len = str.length,
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

export function getRange(start, end, hasLast = false) {
  const list = [];
  if (hasLast) {
    end += 1;
  }
  for (let i = start; i < end; i++) {
    list.push(i);
  }
  return list;
}

Object.is = Object.is
  ? Object.is
  : function(v1, v2) {
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    if (isNaN(v1)) {
      return isNaN(v2);
    }
    return v1 === v2;
  };

if (!Promise.map) {
  Promise.map = function(vals, cb) {
    // 一个等待所有map的promise的新promise
    return Promise.all(
      // 注:一般数组map(..)把值数组转换为 promise数组
      vals.map(function(val) {
        // 用val异步map之后决议的新promise替换val
        return new Promise(function(resolve) {
          cb(val, resolve);
        });
      })
    );
  };
}

if (!Promise.wrap) {
  Promise.wrap = function(fn) {
    return function() {
      var args = [].slice.call(arguments);
      return new Promise(function(resolve, reject) {
        fn.apply(
          null,
          args.concat(function(err, v) {
            if (err) {
              reject(err);
            } else {
              resolve(v);
            }
          })
        );
      });
    };
  };
}

if (!Array.prototype.quickSort) {
  Array.prototype.quickSort = function() {
    const l = this.length;
    if (l < 2) return this;
    const basic = this[0],
      left = [],
      right = [];
    let i = 1;

    while (i < l) {
      const iv = this[i];
      iv >= basic && right.push(iv);
      iv < basic && left.push(iv);
      i++;
    }
    return left.quickSort().concat(basic, right.quickSort());
  };
}

export function findIndex(list, item, key) {
  if (key) {
    return list.findIndex(o => o[key] === item[key]);
  } else {
    return list.findIndex(o => o === item);
  }
}

// 检测 大小端
export const littleEndian = (function() {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();

export function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

export function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

export function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(...nextArg) {
      var args = [...prevArgs, ...nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

export function uncurry(fn) {
  return function uncurried(...args) {
    var ret = fn;

    for (const arg of args) {
      ret = ret(arg);
    }

    return ret;
  };
}

export function curryProps(fn, arity = 1) {
  return (function nextCurried(prevArgsObj) {
    return function curried(nextArgObj = {}) {
      var [key] = Object.keys(nextArgObj);
      var allArgsObj = Object.assign({}, prevArgsObj, {
        [key]: nextArgObj[key]
      });

      if (Object.keys(allArgsObj).length >= arity) {
        return fn(allArgsObj);
      } else {
        return nextCurried(allArgsObj);
      }
    };
  })({});
}

export function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}
