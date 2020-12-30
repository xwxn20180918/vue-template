const Time = {
/* 
 *获取年月日时间
*/
 getNowDate(){
    let nowdate = new Date();
    let y = nowdate.getFullYear();
    let m = nowdate.getMonth() + 1;
    let d = nowdate.getDate();
    return y + "-" + m + "-" + d;
  },
  
/**
 * @return {String} 返回一个格式为'yyyy-mm-dd HH:mm:ss'的字符串
 */
 getDateTime(){
    let d, s
    d = new Date()
    let addZero = value => { return value < 10 ? `0${value}` : value }
    s = `${d.getFullYear()}-`
    s = `${s}${addZero(d.getMonth() + 1)}-`
    s += `${addZero(d.getDate())} `
    s += `${addZero(d.getHours())}:`
    s += `${addZero(d.getMinutes())}:`
    s += `${addZero(d.getSeconds())}`
    return s
},
/*
*   str 表示将要替换的字符串
*   l 表示你将要替换的字符
*   r 表示你想要替换的字符
*/
transFormat(str, l, r){
    let reg = new RegExp(l, 'g') // g表示全部替换，默认替换第一个
    str = str.replace(reg, r)
    return str
},

// console.log(transFormat('2019-12-13', '-', '/')); // 2019/12/13
// console.log(transFormat('2019-12-13', '-', '')); // 20191213

/*
*UTC转化标准时间
*/
utcToNorm(utcTime){
    // 转为正常的时间格式 年-月-日 时:分:秒
    let T_pos = utcTime.indexOf('T');
    let Z_pos = utcTime.indexOf('Z');
    let year_month_day = utcTime.substr(0, T_pos);
    let hour_minute_second = utcTime.substr(T_pos + 1, Z_pos - T_pos - 1);
    let newTime = year_month_day + " " + hour_minute_second;
    // 处理成为时间戳
    timeStamp = new Date(Date.parse(newTime));
    timeStamp = timeStamp.getTime();
    timeStamp = timeStamp / 1000;
    // 增加8个小时，北京时间比utc时间多八个时区
    timeStamp = timeStamp + 8 * 60 * 60;
    // 时间戳转为时间
    let normTime = new Date(parseInt(timeStamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return normTime;
  }
  
//   //  测试数据
//   let date = '2019-12-29T03:14:32.860Z'
//   //  let date = JSON.stringify(new Date())
//   console.log(utcToNorm(date));   // 2019-12-29 11:14:32
}

export default Time
