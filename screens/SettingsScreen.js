import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TimeInput } from '../components'
import { constants } from '../utils'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: constants.BLUE,
      borderWidth: 0,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  render() {
    const { workTime, breakTime, updateTime, buttonStyle } = this.props.navigation.state.params

    return (
      <View style={[buttonStyle, styles.settings]}>
        <TimeInput
          title='Work Time'
          onChange={updateTime('work')}
          time={workTime}
        />
        <TimeInput
          title='Break Time'
          onChange={updateTime('break')}
          time={breakTime}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  settings: {
    alignItems: 'stretch',
    backgroundColor: constants.BLUE,
  }
})