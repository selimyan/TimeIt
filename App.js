import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Countdown from './components/Countdown'
import vibrate from './utils/vibrate'

export default class App extends React.Component {
  state = {
    workTime: 1800,
    breakTime: 300,
    timeRemaining: 1800,
    isRunning: false,
    activeTimer: 'work'
  }

  componentDidMount() {
    vibrate()
  }

  render() {
    const { workTime, breakTime, timeRemaining, isRunning, activeTimer } = this.state
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.center]}>{activeTimer} TIME</Text>
        <Countdown style={styles.center} timeRemaining={timeRemaining} />
        <View style={[styles.buttonGroup, styles.center]}>
          <Text>Start/Pause</Text>
          <Text>Reset</Text>
        </View>
        <Text style={styles.center}>Work</Text>
        <Text style={styles.center}>Break</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    paddingTop: 150,
  },
  center: {
    alignSelf: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    textTransform: 'uppercase',
  },
})
