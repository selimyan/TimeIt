import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { constants } from '../utils'

const SettingsButton = ({ workTime, breakTime, updateTime, buttonStyle, navigate }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons
        size={40}
        name='ios-settings'
        color={constants.DARK_GREY}
        onPress={() => navigate('Settings', { workTime, breakTime, buttonStyle, updateTime })}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingBottom: 80,
    paddingRight: 30,
  },
})

export default SettingsButton