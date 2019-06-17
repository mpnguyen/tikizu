import React, { Component } from 'react'
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Metrics } from '../../themes'

class Welcome extends Component {

  constructor(props) {
    super(props)

    this.navigationToScreen = this.navigationToScreen.bind(this)
  }

  navigationToScreen(screen) {
    this.props.navigation.navigate(screen)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Tikizu</Text>
        <TouchableOpacity style={styles.navBtn}
          onPress={() => this.navigationToScreen('Game')}
        >
          <Text style={styles.navTxt}>Bắt đầu chơi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}
          onPress={() => this.navigationToScreen('Ranking')}
        >
          <Text style={styles.navTxt}>Bảng xếp hạng</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object,
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 40,
  },
  navBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.secondaryDark,
    marginTop: 20,
    width: Metrics.screenWidth - 4 * Metrics.screenPadding,
    alignItems: 'center',
  },
  navTxt: {
    color: Colors.white,
    fontSize: 25,
  },
})