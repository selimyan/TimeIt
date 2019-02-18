import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import TimerScreen from './screens/TimerScreen'
import SettingsScreen from './screens/SettingsScreen'

const AppStackNavigator = createStackNavigator({
  Timer: TimerScreen,
  Settings: SettingsScreen,
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