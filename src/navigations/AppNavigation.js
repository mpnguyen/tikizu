import { createAppContainer, createStackNavigator } from 'react-navigation'
import Welcome from '../containers/Welcome'
import Game from '../containers/Game'
import Ranking from '../containers/Ranking'

const MainStack = createStackNavigator({
  Welcome: { screen: Welcome },
  Game: { screen: Game },
  Ranking: { screen: Ranking },
}, {
  initialRouteName: 'Welcome',
  headerMode: 'none',
})

const RootStack = createStackNavigator(
  {
    Main: { screen: MainStack },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppContainer = createAppContainer(RootStack)

// Now AppContainer is the main component for React to render
export default AppContainer