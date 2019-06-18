import React, { Component } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GameActions from '../../redux/gameRedux'
import { secondsToMinutes } from '../../utils/commons'
import { NUMBER_COL } from '../../utils/constants'

import styles from './gameStyles'

class Game extends Component {

  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.goBack = this.goBack.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.restartGameRequest = this.restartGameRequest.bind(this)
    this.state = { time: 0 }
  }

  componentDidMount() {
    this.props.generateGameDataRequest()
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isComplete && this.props.isComplete) {
      alert('Done') // eslint-disable-line
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }

  restartGame() {
    this.props.generateGameDataRequest()
    this.setState({ time: 0 })
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time + 1 })
      }, 1000)
    }
  }

  restartGameRequest() {
    Alert.alert('Thông báo', 'Bạn có chắc bạn muốn restart game?', [
      { text: 'Có', onPress: this.restartGame },
      { text: 'Không' },
    ])
  }

  goBack() {
    const { navigation } = this.props
    navigation.goBack()
  }

  renderItem({ item, index }) {
    const { changeValueItemRequest } = this.props
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
        disabled={item.isAutoGen}
        onPress={() =>
          changeValueItemRequest(index)
        }
      >
        {item.isAutoGen ? (
          <FaIcon style={styles.lock} size={20} name="lock" />
        ) : <View />}
      </TouchableOpacity>
    )
  }

  render() {
    const { data } = this.props
    const { time } = this.state

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Tikizu</Text>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={this.restartGameRequest}
              >
                <FaIcon name="repeat" size={20} style={styles.iconBtn} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={this.goBack}
              >
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
            extraData={this.props}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
          />
        </SafeAreaView>
      </View>
    )
  }
}

Game.propTypes = {
  isComplete: PropTypes.bool,
  data: PropTypes.array,
  changeValueItemRequest: PropTypes.func,
  generateGameDataRequest: PropTypes.func,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  data: state.game.data,
  isComplete: state.game.isComplete,
})

const mapDispatchToProps = (dispatch) => ({
  changeValueItemRequest: (index) =>
    dispatch(GameActions.changeValueItemRequest(index)),
  generateGameDataRequest: () =>
    dispatch(GameActions.generateGameDataRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)