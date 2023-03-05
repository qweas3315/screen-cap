const formatDate = (date: Date): string => {
  //年份
  const Year: number = date.getFullYear()

  //月份下标是0-11
  const Months: any = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1

  //具体的天数
  const Day: any = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

  //小时
  const Hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()

  //分钟
  const Minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  //秒
  const Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  //返回数据格式
  return Year + '-' + Months + '-' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds
}

export default formatDate
