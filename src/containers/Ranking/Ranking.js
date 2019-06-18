import React, { Component } from 'react'
import {
  FlatList, View, SafeAreaView, Text, TouchableOpacity,
} from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import loGet from 'lodash/get'
import { secondsToMinutes, formatDate } from '../../utils/commons'

import styles from './rankingStyles'

class Ranking extends Component {

  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.goBackToHome = this.goBackToHome.bind(this)
  }

  goBackToHome() {
    const { navigation } = this.props
    navigation.popToTop()
  }

  renderItem({ item }) {
    let activeStyle = {}
    const gameId = loGet(this.props, ['navigation', 'state', 'params', 'game', 'id'], '')
    if (gameId && gameId === item.id) {
      activeStyle = styles.activeItem
    }

    return (
      <View style={[styles.rankItem, activeStyle]}>
        <Text style={styles.scoreTxt}>{secondsToMinutes(item.time)}</Text>
        <Text style={styles.timeTxt}>{formatDate(item.datetime)}</Text>
      </View>
    )
  }

  render() {
    const { data } = this.props

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Bảng xếp hạng</Text>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={this.goBackToHome}
              >
                <FaIcon name="home" size={25} style={styles.iconBtn} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            ListEmptyComponent={() => <Text style={styles.emptyTxt}>Chưa có lượt chơi nào!</Text>}
            style={styles.flatList}
            contentContainerStyle={styles.contentContainerStyle}
            data={data}
            extraData={this.props}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
          />
        </SafeAreaView>
      </View>
    )
  }
}

Ranking.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({
  data: state.ranking.data,
})

export default connect(mapStateToProps)(Ranking)