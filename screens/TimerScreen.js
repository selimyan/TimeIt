import React from 'react'
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { Countdown, TimerToggleButton, TimeInput, TimerButton } from '../components'
import { vibrate, Timer } from '../utils'

const DEFAULT_WORK_MINS = 0.18
const DEFAULT_BREAK_MINS = 0.09
const { width } = Dimensions.get('window')

const nextTimer = { work: 'break', break: 'work' }

export default class TimerScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    workTime: Math.floor(DEFAULT_WORK_MINS * 60),
    breakTime: Math.floor(DEFAULT_BREAK_MINS * 60),
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
    const { workTime, breakTime, isRunning, activeTimer } = this.state
    const { container, title, center, buttonGroup, greyText } = styles

    const bgColor = activeTimer === 'work' ? '#31cff7' : '#fce205'
    const totalTime = activeTimer === 'work' ? workTime : breakTime
    const timeRemaining = Math.floor(this.state.timeRemaining / 1000)

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...container, backgroundColor: bgColor }}>
          <Countdown
            style={[center, greyText]}
            timeRemaining={timeRemaining}
            totalTime={totalTime}
            bgColor={bgColor}
            activeTimer={activeTimer}
          />
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
          <View style={[buttonGroup, greyText]}>
            <TimerToggleButton onToggle={this.toggleTimer} isRunning={isRunning} />
            <TimerButton name='ios-repeat' handlePress={this.resetTimer} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
  },
  center: {
    alignSelf: 'center',
  },
  greyText: {
    color: '#363636'
  },
  buttonGroup: {
    width: width,
    marginTop: 50,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
