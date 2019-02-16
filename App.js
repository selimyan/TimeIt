import React from 'react'
import { StyleSheet, Text, View, Button, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Countdown, TimerToggleButton, TimeInput } from './components'
import { vibrate, Timer } from './utils'

const DEFAULT_WORK_MINS = 0.2
const DEFAULT_BREAK_MINS = 0.1

const nextTimer = { work: 'break', break: 'work' }

export default class App extends React.Component {
  state = {
    workTime: DEFAULT_WORK_MINS * 60,
    breakTime: DEFAULT_BREAK_MINS * 60,
    timeRemaining: DEFAULT_WORK_MINS * 60 * 1000,
    isRunning: false,
    activeTimer: 'work'
  }

  componentDidMount() {
    this.timer = new Timer(this.state.timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
  }

  componentWillUnmount() {
    if (this.timer) this.timer.stop()
  }

  updateTimeRemaining = (timeRemaining) => {
    this.setState({ timeRemaining })
  }

  updateTime = (target) => (time, shouldStartTimer) => {
    if (this.state.activeTimer === target) {
      if (this.timer) this.timer.stop()
      const timeRemaining = +time * 1000
      this.timer = new Timer(timeRemaining, this.updateTimeRemaining, this.handleTimerEnd)
      if (!shouldStartTimer) this.timer.stop()
      this.setState({
        [`${target}Time`]: time,
        timeRemaining,
        isRunning: this.timer.isRunning
      })
    } else {
      this.setState({
        [`${target}Time`]: time,
        isRunning: this.timer.isRunning
      })
    }
  }

  resetTimer = (shouldStopTimer) => {
    const { activeTimer } = this.state
    this.updateTime(activeTimer)(this.state[`${activeTimer}Time`], !shouldStopTimer)
  }

  handleTimerEnd = () => {
    vibrate()
    this.setState((prevState) => (
      { activeTimer: nextTimer[prevState.activeTimer] }), this.resetTimer)
  }

  toggleTimer = () => {
    if (!this.timer) return
    if (this.timer.isRunning) this.timer.stop()
    else this.timer.start()

    this.setState({ isRunning: this.timer.isRunning })
  }

  render() {
    const { workTime, breakTime, timeRemaining, isRunning, activeTimer } = this.state
    const { container, title, center, buttonGroup } = styles

    let bgColor = activeTimer === 'work' ? '#31cff7' : '#fce205'

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...container, backgroundColor: bgColor }}>
          <Text style={[title, center]}>{activeTimer} TIME</Text>
          <Countdown style={center} timeRemaining={timeRemaining} />
          <TimeInput
            title='Work Time:'
            onChange={this.updateTime('work')}
            time={workTime}
          />
          <TimeInput
            title='Break Time:'
            onChange={this.updateTime('break')}
            time={breakTime}
          />
          <View style={[buttonGroup, center]}>
            <TimerToggleButton onToggle={this.toggleTimer} isRunning={isRunning} />
            <Button title='Reset' onPress={this.resetTimer} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
