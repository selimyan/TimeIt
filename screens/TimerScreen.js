import React from 'react'
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Countdown, TimerToggleButton, TimerButton, SettingsIcon } from '../components'
import { vibrate, Timer, constants } from '../utils'

const { DEFAULT_BREAK_SECS, DEFAULT_WORK_SECS, WIDTH, NEXT_TIMER, DARK_GREY, BLUE, YELLOW } = constants

export default class TimerScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    workTime: DEFAULT_WORK_SECS,
    breakTime: DEFAULT_BREAK_SECS,
    timeRemaining: DEFAULT_WORK_SECS * 1000,
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
      { activeTimer: NEXT_TIMER[prevState.activeTimer] }), this.resetTimer)
  }

  toggleTimer = () => {
    if (!this.timer) return
    if (this.timer.isRunning) this.timer.stop()
    else this.timer.start()

    this.setState({ isRunning: this.timer.isRunning })
  }

  render() {
    const { workTime, breakTime, isRunning, activeTimer } = this.state
    const { container, center, buttonGroup, greyText } = styles

    const bgColor = activeTimer === 'work' ? BLUE : YELLOW
    const totalTime = activeTimer === 'work' ? workTime : breakTime
    const timeRemaining = Math.floor(this.state.timeRemaining / 1000)

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...container, backgroundColor: bgColor }}>
          <SettingsIcon
            workTime={workTime}
            breakTime={breakTime}
            updateTime={this.updateTime}
            navigate={this.props.navigation.navigate}
          />
          <Countdown
            style={[center, greyText]}
            timeRemaining={timeRemaining}
            totalTime={totalTime}
            bgColor={bgColor}
            activeTimer={activeTimer}
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
    paddingTop: 70,
  },
  center: {
    alignSelf: 'center',
  },
  greyText: {
    color: DARK_GREY
  },
  buttonGroup: {
    width: WIDTH,
    marginTop: 50,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
