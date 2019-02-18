import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import PropTypes from 'prop-types'
import { secToMin, constants } from '../utils'

const Countdown = ({ timeRemaining, totalTime, bgColor, style, activeTimer }) => {
  const percent = 100 - timeRemaining / totalTime * 100
  const displayTime = secToMin(timeRemaining)

  return (
    <View>

      <ProgressCircle
        percent={percent}
        radius={140}
        borderWidth={12}
        color={constants.DARK_GREY}
        shadowColor={constants.LIGHT_GREY}
        bgColor={bgColor}
      >
        <View>
          <Text style={[styles.text, style]}>{displayTime}</Text>
          <Text style={[styles.title, style]}>{activeTimer}</Text>
        </View>
      </ProgressCircle>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { fontSize: 72 },
  title: {
    fontSize: 30,
    textTransform: 'uppercase',
  },
})

Countdown.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
}

export default Countdown