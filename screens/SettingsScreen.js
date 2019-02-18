import React from 'react'
import { View } from 'react-native'
import { TimeInput } from '../components'

export default class SettingsScreen extends React.Component {
  render() {
    const { workTime, breakTime, updateTime } = this.props.navigation.state.params

    return (
      <View>
        <TimeInput
          title='Work Time:'
          onChange={updateTime('work')}
          time={workTime}
        />
        <TimeInput
          title='Break Time:'
          onChange={updateTime('break')}
          time={breakTime}
        />
      </View>
    )
  }
}