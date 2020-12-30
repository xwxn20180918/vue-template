import { CHOOSE, COLOR_TYPE, WARN_MSG } from "../common/js/config";
import notify from "../utils/notify";
import { isDef } from "../common/js/utils";
import * as R from "ramda";
import {formatDate, formatDateTime} from "../utils/filters";

const preHandle = function(callback, val) {
  if (!this.checkedData.length) {
    notify.warn({ message: WARN_MSG });
    return;
  }
  callback(val);
};

const normal = {
  size: "mini",
  defaultColor: COLOR_TYPE.DEFAULT,
  dangerColor: COLOR_TYPE.DANGER,
  successColor: COLOR_TYPE.SUCCESS,
  warningColor: COLOR_TYPE.WARNING,
  infoColor: COLOR_TYPE.INFO
};

const data = {
  ...normal,
  tableData: [],
  tableHeight: null,
  totalSize: 0,
  pageSize: 20,
  currentPage: 1,
  pageSizes: [20, 30, 50, 100],
  paginationLayout: "total, sizes, prev, pager, next, jumper",

  orderByField: "",
  asc: "",

  currentTableRowIndex: "",

  tableLoad: true,

  param: {},
  originParam: {},

  isQueryDataChange: false
};

const methods = {
  /**
   * 分页查询的时候，不应该将 currentPage 设置为 1
   * 按钮查询的时候，如果查询的值不变，也不应该将 currentPage 设置为 1
   */
  originSearch() {},
  search(active) {
    if (this.isQueryDataChange) {
      this.currentPage = 1;
      this.isQueryDataChange = false;
    }
    this.originSearch();
    return active;
  },
  reset() {
    this.isQueryDataChange = true;
    this.param = { ...this.originParam};
    this.search();
  },
  handleSizeChange(val) {
    this.pageSize = val;
    this.search();
  },
  handleCurrentChange(val) {
    this.currentPage = val;
    this.search();
  },
  // 表格排序
  resetSort() {
    this.asc = "";
    this.orderByField = "";
  },
  sortTableData(col, ...rest) {
    if (col.order) {
      const prop = col.prop;
      const asc = col.order.includes("asc");
      const orderByField = prop;
      this.asc = asc;
      this.orderByField = orderByField;
    } else {
      this.asc = "";
      this.orderByField = "";
    }
    this.search(...rest);
  },
  // 多选
  multipleChoice(row, event) {
    const tableData = this.tableData;
    const currentClickIndex = tableData.indexOf(row);

    if (this.currentTableRowIndex !== "") {
      if (event.shiftKey === 1) {
        let startIndex = 0,
          endIndex = 0;
        if (this.currentIndex < currentClickIndex) {
          startIndex = this.currentClickIndex;
          endIndex = currentClickIndex;
        } else {
          startIndex = currentClickIndex;
          endIndex = this.currentClickIndex;
        }
        for (let i = startIndex; i <= endIndex; i++) {
          this.$refs.elTable.toggleRowSelection(tableData[i], true);
        }
        this.clearmultipleChoiceIndex();
      } else {
        this.$refs.elTable.toggleRowSelection(row);
      }
    } else {
      this.$refs.elTable.toggleRowSelection(row);
      this.currentTableRowIndex = currentClickIndex;
    }
  },
  // 清除当前多选选中的行
  clearmultipleChoiceIndex() {
    this.currentTableRowIndex = "";
  }
};

const computed = {
  // get 参数用
  query() {
    const query = {
      size: this.pageSize,
      current: this.currentPage,
      asc: isDef(this.asc) ? this.asc : undefined,
      orderByField: isDef(this.orderByField) ? this.orderByField : undefined
    };
    Object.keys(this.param).forEach(key => {
      if (typeof this.param[key] === "string") {
        query[key] = this.param[key].trim();
      } else if (Array.isArray(this.param[key])) {
        query[key] = this.param[key].join();
      } else {
        query[key] = this.param[key];
      }
    });
    return query;
  },
  // post 用参数
  postData() {
    const all = this.allSelected;
    const ids = this.checkedData.map(o => o.id);
    const query = {};
    Object.keys(this.param).forEach(key => {
      if (typeof this.param[key] === "string") {
        query[key] = this.param[key].trim();
      } else {
        query[key] = this.param[key];
      }
    });
    return all ? { all, query } : { all, ids };
  },
  // post 用参数 this.postData
  postObjData() {
    const all = this.allSelected;
    const objs = this.checkedData.map(o => {
      return { id: o.id, name: o.name };
    });
    const query = {};
    Object.keys(this.param).forEach(key => {
      if (typeof this.param[key] === "string") {
        query[key] = this.param[key].trim();
      } else {
        query[key] = this.param[key];
      }
    });
    return all ? { all, query } : { all, objs };
  }
};

const watch = {
  param: {
    handler(newVal) {
      // eslint-disable-next-line no-undef
      this.isQueryDataChange = !R.whereEq(newVal, this.originParam);
      console.log("watch param");
    },
    deep: true
  }
};

// 基本常量
export const normalMixin = {
  data() {
    return {
      ...normal
    };
  }
};

// 没有全选使用
export const dataMixin = {
  data() {
    return {
      ...data
    };
  },
  methods: methods,
  computed: computed,
  watch: watch,
  filters:{
    formatDateTime,
    formatDate
  }
};

// 全选全不选使用
export const tableMixin = {
  data() {
    return {
      ...data,
      checkedCount: 0, // 选中数量
      checkedData: []
    };
  },
  created() {
    this.chooseOption = CHOOSE;
  },
  methods: {
    preHandle,
    // 词选择选项
    handleCommand(command) {
      const m = {
        current: this.setCurrentPageTable,
        inverse: this.setReverseTable,
        all: this.setAllTable,
        cancel: this.setNoneTable
      };
      const trigger = m[command];
      trigger();
    },
    // 全选所有页
    setAllTable() {
      this.setCurrentPageTable();
      this.checkedCount = this.totalSize;
    },
    // 全选本页
    setCurrentPageTable() {
      const checkedData = [...this.tableData];
      checkedData.forEach(row => {
        this.$refs.elTable.toggleRowSelection(row, true);
      });
      this.checkedCount = checkedData.length;
    },
    // 反选型号
    setReverseTable() {
      const checkedData = [...this.tableData];
      checkedData.forEach(row => {
        this.$refs.elTable.toggleRowSelection(row);
      });
    },
    // 全不选型号
    setNoneTable() {
      this.$refs.elTable.clearSelection();
    },
    handleSelectionChange(rows) {
      this.checkedData = rows;
      this.checkedCount = rows.length;
    },
    ...methods
  },
  computed: {
    allSelected() {
      // 全选 当有选中项和选中的长度等于总数据的长度
      return this.checkedData.length && this.checkedCount === this.totalSize;
    },
    ...computed
  },
  watch: watch
};

export const loadingMixin = {
  data() {
    return {
      loading: false
    };
  }
};

export const analyticsChartMixin = {
  data() {
    return {
      loading: false,
      showChart: true,
      errorMsg: ""
    };
  }
};
