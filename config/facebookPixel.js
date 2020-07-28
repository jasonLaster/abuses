export default {
  track: 'PageView',
  pixelId: process.env.NUXT_ENV_FACEBOOK_PIXEL_KEY || 'PLACEHOLDER',
  disabled: () => {
    if (!process.env.NUXT_ENV_FACEBOOK_PIXEL_KEY) return true

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
