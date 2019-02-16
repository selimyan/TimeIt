import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import PropTypes from 'prop-types'

export default class TimeInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    time: PropTypes.number,
  }

  state = {
    mins: Math.floor(this.props.time / 60),
    secs: this.props.time % 60
  }

  handleMinChange = (mins) => {
    this.setState({ mins: +mins })
    this.props.onChange(mins * 60 + this.state.secs)
  }

  handleSecChange = (secs) => {
    this.setState({ secs: +secs })
    this.props.onChange(this.state.mins * 60 + secs)
  }

  render() {
    const { title } = this.props
    const { mins, secs } = this.state

    return (
      <View style={styles.container}>
        {title && <Text style={styles.bold}>{title}</Text>}
        <View style={styles.controls}>
          <Text>Mins: </Text>
          <TextInput
            defaultValue={`${mins}`}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={this.handleMinChange}
          />
          <Text>Secs: </Text>
          <TextInput
            defaultValue={`${secs}`}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={this.handleSecChange}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20
  },
  controls: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    paddingHorizontal: 5,
    minWidth: 50,
  }
})