function getNextDate (date, day) {
  let dd = new Date(date)
  dd.setDate(dd.getDate() + day)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return y + '-' + m + '-' + d
};
export default getNextDate
