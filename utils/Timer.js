export default class Timer {
  constructor(duration, onTick, onEnd) {
    this.duration = duration
    this.onTick = onTick
    this.onEnd = onEnd
    this.endTime = Date.now() + duration
    this.isRunning = false
  }

  get timeRemaining() {
    return this.endTime - Date.now()
  }

  clearTick = () => {
    clearTimeout(this.timeout)
    this.timeout = null
  }

  tick = () => {
    if (this.endTime < Date.now()) {
      this.onTick(0)
      this.onEnd()
      this.isRunning = false
    } else {
      this.onTick(this.timeRemaining)
      this.isRunning = true
      // account for delays
      const nextTick = this.timeRemaining % 1000

      this.timeout = setTimeout(this.tick, nextTick);
    }
  }

  stop = () => {
    if (!this.isRunning) return
    this.clearTick()
    this.duration = this.timeRemaining
    this.endTime = null
    this.isRunning = false
  }

  start = () => {
    if (this.isRunning) return
    this.endTime = Date.now() + this.duration
    this.isRunning = true
    this.tick()
  }
}