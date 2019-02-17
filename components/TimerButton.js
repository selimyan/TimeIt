import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

const TimerButton = ({ name, handlePress }) => {
  return (
    <TouchableOpacity style={styles.icon}>
      <Ionicons
        size={40}
        color='#fff'
        name={name}
        onPress={handlePress}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 80,
    width: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#363636'
  }
})

TimerButton.propTypes = {
  name: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
}

export default TimerButton