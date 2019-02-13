import React from 'react'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { secToMin } from '../utils'

const Countdown = (props) => {
  const timeRemaining = secToMin(props.timeRemaining)

  return (
    <Text style={[styles.text, props.style]}>{timeRemaining}</Text>
  )
}

const styles = StyleSheet.create({
  text: { fontSize: 72 }
})

Countdown.propTypes = {
  timeRemaining: PropTypes.number.isRequired,
}

export default Countdown