import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigation from '../../navigations/AppNavigation'

class RootContainer extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <AppNavigation />
      </View>
    )
  }
}

export default RootContainer