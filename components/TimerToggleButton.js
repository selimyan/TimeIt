import React from 'react'
import PropTypes from 'prop-types'
import TimerButton from './TimerButton'

const TimerToggleButton = ({ isRunning, onToggle }) => {
  const name = isRunning ? 'md-pause' : 'md-play'
  return (
    <TimerButton name={name} handlePress={onToggle} />
  )
}

TimerToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
}

export default TimerToggleButton