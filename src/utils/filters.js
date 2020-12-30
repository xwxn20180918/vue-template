
// 百分数小数点后两位
import {isDate, isDef} from "../common/js/utils";

export function percentageFilter(originValue) {
  const value = originValue * 100
  return isNaN(value) ? '' : value.toFixed(2) + '%'
}

// 返回中文是和否
export function whetherFilter(originValue) {
  return originValue ? '是' : '否'
}

// el-tag type选择
const statusMap = {
  true: 'success',
  false: 'info'
}
export function statusFilter(status) {
  return statusMap[status]
}

export function findMatch(val, option) {
  const rest = option.filter(o => {
    return o.value === val
  })
  return rest.length ? rest[0].label : ''
}

// yyyy/mm/dd hh:mm
export function formatDateTime(val) {
  const m = new Date(val)
  return m.getFullYear() + '/' +
    ('0' + (m.getMonth() + 1)).slice(-2) + '/' +
    ('0' + m.getDate()).slice(-2) + ' ' +
    ('0' + m.getHours()).slice(-2) + ':' +
    ('0' + m.getMinutes()).slice(-2)
}

export function formatDate(date = new Date()) {
  if (!isDef(date)) return ''
  if (!isDate(date)) date = new Date(date)
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  // const hours = date.getHours()
  // const minutes = date.getMinutes()
  // return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + '：' + minutes
  return date.getFullYear() + '-' + month + '-' + day
}
// yyyy-mm-dd hh:mm
export function formatDateTimeDetail (date = new Date()) {
  if (!isDef(date)) return ''
  if (!isDate(date)) date = new Date(date)
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + '：' + minutes
}

// yyyy-mm-dd hh:mm:ss
export function formatDateTime (date = new Date()) {
  if (!isDef(date)) return ''
  if (!isDate(date)) date = new Date(date)
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + '：' + minutes + ': ' + seconds
}
