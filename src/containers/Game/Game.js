import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Colors, Metrics } from '../../themes'
import { secondsToMinutes } from '../../utils/commons'

const NUMBER_COL = 4
const MAX_RANDOM = 4
const MIN_RANDOM = 2
const ITEM_SIZE = (Metrics.screenWidth - 2 * Metrics.screenPadding) / NUMBER_COL

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: this.generateGameData(),
      time: 0,
    }

    this.renderItem = this.renderItem.bind(this)
    this.changeValueItem = this.changeValueItem.bind(this)
    this.checkComplete = this.checkComplete.bind(this)
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  generateGameData() {
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
      } while (!this.checkValidItem(idx, data))

      data[idx].isAutoGen = true
    }
    return data
  }

  checkValidItem(idx, data) {
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

  changeValueItem(index) {
    const { data } = this.state
    if (data[index].isAutoGen) { return }

    data[index].value = (data[index].value + 1) % 3
    this.setState({ data }, this.checkComplete)
  }

  checkComplete() {
    const { data } = this.state
    for (let i = 0; i < NUMBER_COL; i++) {
      let totalRedRow = 0
      let totalRedCol = 0

      for (let j = 0; j < NUMBER_COL; j++) {
        const idxInRow = i * NUMBER_COL + j // { row: i, col: j } => Loop over row i
        const idxInCol = j * NUMBER_COL + i // { row: j, col: i } => Loop over col i

        if (data[idxInRow].value === 2) {
          return
        }

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
            return
          }

          const idxPrevRow = (j - 1) * NUMBER_COL + i // { row: j - 1, col: i }
          const idxNextRow = (j + 1) * NUMBER_COL + i // { row: j + 1, col: i }
          if (data[idxPrevRow].value === data[idxInCol].value &&
            data[idxNextRow].value === data[idxInCol].value) {
            return
          }
        }
      }

      if (totalRedCol !== NUMBER_COL / 2 || totalRedRow !== NUMBER_COL / 2) {
        return
      }
    }

    alert('done') // eslint-disable-line
  }

  renderItem({ item, index }) {
    const rowIdx = Math.floor(index / NUMBER_COL)
    const colIdx = index % NUMBER_COL

    const itemAutoGenStyle = item.isAutoGen ? styles.itemAutoGenStyle : {}
    let itemStyle = (rowIdx + colIdx) % 2 !== 0 ? styles.itemOdd : {}

    if (item.value === 0) {
      itemStyle = styles.itemRed
    }

    if (item.value === 1) {
      itemStyle = styles.itemGreen
    }

    return (
      <TouchableOpacity
        key={index}
        style={[styles.itemBtn, itemStyle, itemAutoGenStyle]}
        activeOpacity={1}
        onPress={() =>
          this.changeValueItem(index)
        }
      >
        {item.isAutoGen ? (
          <FaIcon style={styles.lock} size={20} name="lock" />
        ) : <View />}
      </TouchableOpacity>
    )
  }

  render() {
    const { data, time } = this.state

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Tikizu</Text>
            <View style={styles.headerButton}>
              <TouchableOpacity style={styles.btnContainer}>
                <FaIcon name="repeat" size={20} style={styles.iconBtn} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnContainer}>
                <FaIcon name="home" size={25} style={styles.iconBtn} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.clockContainer}>
            <FaIcon style={styles.clockTxt} name='clock-o' />
            <Text style={styles.clockTxt}>{secondsToMinutes(time)}</Text>
          </View>
          <FlatList
            style={styles.flatList}
            bounces={false}
            contentContainerStyle={styles.contentContainerStyle}
            numColumns={NUMBER_COL}
            data={data}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
          />
        </SafeAreaView>
      </View>
    )
  }
}

export default Game

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: Metrics.screenPadding,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 20,
  },
  contentContainerStyle: {
    marginTop: 20,
    marginHorizontal: Metrics.screenPadding,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  itemBtn: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  itemOdd: {
    backgroundColor: Colors.inactive,
  },
  itemRed: {
    backgroundColor: Colors.red,
  },
  itemGreen: {
    backgroundColor: Colors.green,
  },
  lock: {
    color: '#ccc',
  },
  headerButton: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginLeft: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtn: {
    color: Colors.white,
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  clockTxt: {
    color: Colors.white,
    fontSize: 30,
    marginRight: 10,
  },
})