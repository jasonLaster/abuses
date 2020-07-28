import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async (ctx, inject) => {
  const runtimeConfig = ctx.$config && ctx.$config.googleAnalytics || {}
  const moduleOptions = {"dev":true,"debug":{"sendHitTask":true},"id":undefined,"set":[{"field":"anonymizeIp","value":true}],"disabled":() => {
    if (!process.env.NUXT_ENV_GOOGLE_ANALYTICS_KEY) return true

    const doNotTrack =
      window.navigator.doNotTrack ||
      window.doNotTrack ||
      window.navigator.msDoNotTrack
    if (doNotTrack !== '1' && doNotTrack !== 'yes') {
      return false
    }
    return true
  }}
  const options = {...moduleOptions, ...runtimeConfig}

  if (typeof options.asyncID === 'function') {
    options.id = await options.asyncID(ctx)
  }

  Vue.use(VueAnalytics, {...{ router: ctx.app.router }, ...options})

  ctx.$ga = Vue.$ga
  inject('ga', Vue.$ga)
}
