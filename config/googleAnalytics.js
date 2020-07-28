export default {
  id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_KEY,
  set: [{ field: 'anonymizeIp', value: true }],
  disabled: () => {
    if (!process.env.NUXT_ENV_GOOGLE_ANALYTICS_KEY) return true

    const doNotTrack =
      window.navigator.doNotTrack ||
      window.doNotTrack ||
      window.navigator.msDoNotTrack
    if (doNotTrack !== '1' && doNotTrack !== 'yes') {
      return false
    }
    return true
  },
}
