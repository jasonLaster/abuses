export default () => {
  const doNotTrack =
    window.navigator.doNotTrack ||
    window.doNotTrack ||
    window.navigator.msDoNotTrack
  if (doNotTrack === '1' || doNotTrack === 'yes') {
    return true
  }
  return false
}
