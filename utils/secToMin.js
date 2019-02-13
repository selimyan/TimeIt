export default (timeRemaining) => {
  const mins = Math.floor(timeRemaining / 60)
  const secs = timeRemaining % 60
  const paddedZero = secs < 10 ? '0' : ''
  return `${mins}:${paddedZero}${secs}`
}