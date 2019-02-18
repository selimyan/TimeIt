import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import TimerScreen from './screens/TimerScreen'
import SettingsScreen from './screens/SettingsScreen'

const AppStackNavigator = createStackNavigator({
  Timer: {
    screen: TimerScreen,
    navigationOptions: () => ({
      headerBackTitle: null
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      title: 'Settings',
    }),
  }
}, {
    initialRouteName: 'Timer'
  })

const AppContainer = createAppContainer(AppStackNavigator)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}