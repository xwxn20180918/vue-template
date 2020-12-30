// import { getRange } from "common/js/utils";
import time from "../time";

export const JS_TYPE = {
  NULL: "[object Null]",
  OBJECT: "[object Object]",
  ARRAY: "[object Array]",
  DATE: "[object Date]"
};

export const COLOR_TYPE = {
  DEFAULT: "primary",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
  ERROR: "error"
};

export const COLOR = {
  blue: "#409EFF",
  succ: "#67C23A",
  err: "#F56C6C",
  warn: "#E6A23C",
  info: "#909399"
};

export const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

export const ERR = "400";

export const WARN_MSG = "请至少选择一项";
export const NOT_ALL_WARN_MSG = "不支持全选";

export const SUCC_MSG = "执行成功";
export const PEER_KEYWORD_SUCC_MSG = "收集同行关键词成功";
export const HOT_SEARCH_WORD_SUCC_MSG = "收集关键词成功";
export const ERR_MSG = "执行失败";

export const DETAIL_TEMPLATE_INFO =
  "图片数量超出限制，最多上传15张图片, 最多50000字";

export const website = "https://www.maoniunet.com/software";

// 布尔通用类型
export const BOOLEAN = [
  { label: "是", value: true },
  { label: "否", value: false }
];

// 全选 全不选
export const CHOOSE = [
  { label: "本页选中", value: "current" },
  { label: "本页反选", value: "inverse" },
  { label: "全部选择", value: "all" },
  { label: "取消选择", value: "cancel" }
];

// 匹配度
export const MATCH_RATE = [{ label: "重点", value: "HIGH" }];

// 来源
export const SOURCE = [
  { label: "手工添加", value: "MANUAL" },
  { label: "同行数据", value: "INDUSTRY" },
  { label: "Excel导入", value: "IMPORT" },
  { label: "自动组合", value: "COMBINATOR"}
];

// 热度
export const HEAT = [
  { label: "大于1", value: "ONE_MORE" },
  { label: "1", value: "ONE" },
  { label: "0", value: "EMPTY" }
];

// 星级
export const QS_STAR = [
  { label: "零星", value: 0 },
  { label: "一星", value: 1 },
  { label: "二星", value: 2 },
  { label: "三星", value: 3 },
  { label: "四星", value: 4 },
  { label: "五星", value: 5 }
];
export const KEYWORD_QS_STAR = [
  { label: "零星", value: 0 },
  { label: "一星", value: 1 },
  { label: "二星", value: 2 },
  { label: "三星", value: 3 },
  { label: "四星", value: 4 },
  { label: "五星", value: 5 },
  { label: "未推广", value: -1 }
];

// 排名
// const RANK_NUMBER = getRange(1, 20, true);
export const RANK = [
  { label: "第一页", value: 1 },
  { label: "第二页", value: 2 },
  { label: "第三页", value: 3 },
  { label: "非首页", value: -2 },
  { label: "未查询", value: -1 },
  { label: "无排名", value: 0 }
];

const HOT_WORD = "hotWord";
const P4P_SEARCH = "p4pSearch";
const MY_WORD = "myWord";
// 词收集
export const WORD_COLLECTION = [
  { label: "数据管家热门搜索词", value: HOT_WORD },
  { label: "p4p搜索相关词", value: P4P_SEARCH },
  { label: "数据管家我的词", value: MY_WORD }
];

// 推广状态
export const STATUS = [
  { label: "启动", value: true },
  { label: "暂停", value: false }
];

// 时段选择
export const INTERVAL = [
  { label: "最近 30 天", value: 30 },
  { label: "最近 7 天", value: 7 },
  { label: "最近 1 天", value: 1 }
];

export const NEW_RULE_NAME = "new";
export const STOP_RULE_NAME = "stop";
export const STAY_RULE_NAME = "stay";

export const P4P_RULE = [
  { label: "不竞价", value: STAY_RULE_NAME },
  { label: "暂停推广", value: STOP_RULE_NAME },
  { label: "新规则", value: NEW_RULE_NAME }
];

export const P4P_RESERVE_PRICE = 0;
export const P4P_RULE_RANK = [
  { label: "第一名", value: 1 },
  { label: "第二名", value: 2 },
  { label: "第三名", value: 3 },
  { label: "第四名", value: 4 },
  { label: "第五名", value: 5 },
  { label: "底价", value: P4P_RESERVE_PRICE }
];

export const P4P_RULE_OPERATOR = [
  { label: "加", value: "+" },
  { label: "减", value: "-" },
  { label: "乘", value: "*" }
];

// 每个月几周
const shortcuts = time.getWeekOfMonth().map((arr, index) => {
  return {
    text: `第${index + 1}周`,
    onClick(picker) {
      picker.$emit("pick", arr);
    }
  };
});
const fourWeeks = time.getFourWeeksAgo().map(arr => {
  const startDay = time.getFormatDate(arr[0]);
  const endDay = time.getFormatDate(arr[1]);
  const option = {
    value: `${startDay} 至 ${endDay}`,
    label: `${startDay} 至 ${endDay}`
  };
  return option;
});
export const DATE_RANG = {
  shortcuts: shortcuts
};
export const FOUR_WEEK_RANG = {
  ...fourWeeks
};

// 星期一 ~ 星期天
export const WEEK = [
  { label: "星期一", value: 1 },
  { label: "星期二", value: 2 },
  { label: "星期三", value: 3 },
  { label: "星期四", value: 4 },
  { label: "星期五", value: 5 },
  { label: "星期六", value: 6 },
  { label: "星期日", value: 7 }
];

export const ALIBABA_IMG_LINK = "1";
export const GOOGLE_IMG_LINK = "2";
export const IMG_LINK = [
  { label: "阿里图片", value: ALIBABA_IMG_LINK },
  { label: "谷歌图片", value: GOOGLE_IMG_LINK }
];

export const PERFERENTIAL = [
  { label: "已优推", value: true },
  { label: "未优推", value: false }
];

export const KEYWORD_CHANNEL = [
  { label: "数据管家-热门搜索词", value: false, key: HOT_WORD },
  { label: "数据关键词-我的词", value: false, key: MY_WORD },
  { label: "直通车-p4p搜索词", value: false, key: P4P_SEARCH }
];

export const DICTIONARY_MODULE = [
  { label: "地区", value: "region" },
  { label: "行业", value: "industry" },
  { label: "渠道", value: "channel"},
  { label: "服务类型", value: "service" }
];
