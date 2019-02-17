import { Dimensions } from 'react-native'

export default {
  DEFAULT_WORK_SECS: 10,
  DEFAULT_BREAK_SECS: 5,
  WIDTH: Dimensions.get('window').width,
  NEXT_TIMER: { work: 'break', break: 'work' },
}