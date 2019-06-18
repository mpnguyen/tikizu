
import { NUMBER_COL, MAX_RANDOM, MIN_RANDOM } from './constants'

function checkValidItem(idx, data) {
  const rowIdx = Math.floor(idx / NUMBER_COL)
  const colIdx = idx % NUMBER_COL

  let totalRedRow = 0
  let totalRedCol = 0
  let totalGreenRow = 0
  let totalGreenCol = 0
  for (let i = 0; i < NUMBER_COL; i++) {
    if (data[rowIdx * NUMBER_COL + i].value === 0) {
      totalRedRow++
    }

    if (data[i * NUMBER_COL + colIdx].value === 0) {
      totalRedCol++
    }

    if (data[rowIdx * NUMBER_COL + i].value === 1) {
      totalGreenRow++
    }

    if (data[i * NUMBER_COL + colIdx].value === 1) {
      totalGreenCol++
    }

    if (i !== 0 && i !== NUMBER_COL - 1) {
      if (data[rowIdx * NUMBER_COL + i + 1].value === data[rowIdx * NUMBER_COL + i] &&
        data[rowIdx * NUMBER_COL + i - 1].value === data[rowIdx * NUMBER_COL + i]) {
        return false
      }

      if (data[(i + 1) * NUMBER_COL + colIdx].value === data[i * NUMBER_COL + colIdx] &&
        data[(i - 1) * NUMBER_COL + colIdx].value === data[i * NUMBER_COL + colIdx]) {
        return false
      }
    }
  }

  if (totalRedCol > NUMBER_COL / 2 || totalRedRow > NUMBER_COL / 2 ||
    totalGreenCol > NUMBER_COL / 2 || totalGreenRow > NUMBER_COL / 2) {
    return false
  }

  return true
}

export function generateGameData() {
  const data = []
  for (let i = 0; i < NUMBER_COL * NUMBER_COL; i++) {
    data.push({ value: 2 })
  }

  const randomValue = Math.round(Math.random() * (MAX_RANDOM - MIN_RANDOM) + MIN_RANDOM)
  for (let i = 0; i < randomValue; i++) {
    let idx = null
    do {
      if (idx) {
        // Fix data invalid
        data[idx].value = 2
      }

      idx = Math.floor(Math.random() * data.length)
      data[idx].value = Math.floor(Math.random() * 1.5)
    } while (!checkValidItem(idx, data))

    data[idx].isAutoGen = true
  }
  return data
}

export function checkComplete(data) {
  const hashTableRow = {}
  const hashTableCol = {}

  for (let i = 0; i < NUMBER_COL; i++) {
    let totalRedRow = 0
    let totalRedCol = 0
    let rowValue = ''
    let colValue = ''

    for (let j = 0; j < NUMBER_COL; j++) {
      const idxInRow = i * NUMBER_COL + j // { row: i, col: j } => Loop over row i
      const idxInCol = j * NUMBER_COL + i // { row: j, col: i } => Loop over col i

      if (data[idxInRow].value === 2 || data[idxInCol] === 2) {
        return false
      }

      rowValue += data[idxInRow].value.toString()
      colValue += data[idxInRow].value.toString()

      // Total red in row i
      if (data[idxInRow].value === 0) { // item color red 
        totalRedRow += 1
      }

      // Total red in col i
      if (data[idxInCol].value === 0) { // item color red 
        totalRedCol += 1
      }

      // check color in row
      if (j !== 0 && j !== NUMBER_COL - 1) {

        if (data[idxInRow - 1].value === data[idxInRow].value &&
          data[idxInRow + 1].value === data[idxInRow].value) {
          return false
        }

        const idxPrevRow = (j - 1) * NUMBER_COL + i // { row: j - 1, col: i }
        const idxNextRow = (j + 1) * NUMBER_COL + i // { row: j + 1, col: i }
        if (data[idxPrevRow].value === data[idxInCol].value &&
          data[idxNextRow].value === data[idxInCol].value) {
          return false
        }
      }
    }

    if (hashTableRow[rowValue] || hashTableCol[colValue]) {
      return false
    } else {
      hashTableRow[rowValue] = true
      hashTableCol[colValue] = true
    }

    if (totalRedCol !== NUMBER_COL / 2 || totalRedRow !== NUMBER_COL / 2) {
      return false
    }
  }

  return true
}