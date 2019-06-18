import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AppNavigation from '../../navigations/AppNavigation'

class RootContainer extends Component {
  render() {
    const { isReady } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        {isReady ? (
          <AppNavigation />
        ) : <View />}
      </View>
    )
  }
}

RootContainer.propTypes = {
  isReady: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isReady: state.app.isReady,
})

export default connect(mapStateToProps)(RootContainer)