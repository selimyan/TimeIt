import { Dimensions } from 'react-native'

export default {
  DEFAULT_WORK_SECS: 10,
  DEFAULT_BREAK_SECS: 5,
  WIDTH: Dimensions.get('window').width,
  NEXT_TIMER: { work: 'break', break: 'work' },
  DARK_GREY: '#363636',
  LIGHT_GREY: '#999DA0',
  BLUE: '#31cff7',
  YELLOW: '#fce205',
}