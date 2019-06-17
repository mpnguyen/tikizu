function pad2(number) {
  return (number < 10 ? '0' : '') + number

}

export function secondsToMinutes(time) {
  return pad2(Math.floor(time / 60)) + ':' + pad2(Math.floor(time % 60))
}