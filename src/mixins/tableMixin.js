import {formatDate, formatDateTime, formatDateTimeDetail} from "../utils/filters";

export default {
  data: function() {
    return {
      currentPage: 1,
      pageSize: 50,
      total: 0,
      sizeOptions: [10, 20, 30, 50],
      orderByField:'id',
      asc:false,
      checkList: []
    }
  },

  computed: {
    queryParams() {
      return {
        size: this.pageSize,
        current: this.currentPage,
        orderByField: this.orderByField,
        asc: this.asc
      }
    }
  },

  methods: {
    handleSizeChange(size) {
      this.pageSize = size
      this.query()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.query()
    },
    query() {
      // overwrite this query
    },
    handleSortChange({ column, prop, order }) {
      this.orderByField = prop;
      this.asc = order === 'ascending'
      this.query();
    }
  },
  filters:{
    formatDateTime,
    formatDate,
    formatDateTimeDetail
   }
}
