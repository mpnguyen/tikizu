
function pad2(number) {
  return (number < 10 ? '0' : '') + number

}

export function secondsToMinutes(time) {
  return pad2(Math.floor(time / 60)) + ':' + pad2(Math.floor(time % 60))
}

export function genUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDate(date) {
  date = new Date(date)

  return date.toLocaleString()
}