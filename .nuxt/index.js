import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_workbox_5be6b81c from 'nuxt_plugin_workbox_5be6b81c' // Source: ./workbox.js (mode: 'client')
import nuxt_plugin_nuxticons_f96cfa9c from 'nuxt_plugin_nuxticons_f96cfa9c' // Source: ./nuxt-icons.js (mode: 'all')
import nuxt_plugin_googleanalytics_22790be0 from 'nuxt_plugin_googleanalytics_22790be0' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_compositionapi_f2a0457e from 'nuxt_plugin_compositionapi_f2a0457e' // Source: ../plugins/composition-api (mode: 'all')
import nuxt_plugin_vueyoutube_e2e19eb4 from 'nuxt_plugin_vueyoutube_e2e19eb4' // Source: ../plugins/vue-youtube (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Police Abuses","titleTemplate":"%s | Police Abuses","meta":[{"charset":"utf-8"},{"name":"format-detection","content":"telephone=no"},{"name":"viewport","content":"width=device-width, initial-scale=1, viewport-fit=cover"},{"name":"apple-mobile-web-app-capable","content":"yes"},{"name":"apple-mobile-web-app-status-bar-style","content":"black-translucent"},{"hid":"og:site_name","name":"og:site_name","content":"Police Abuses"},{"name":"twitter:card","content":"summary"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Police Abuses"},{"hid":"description","name":"description","content":"## Project setup"},{"hid":"theme-color","name":"theme-color","content":"var(--color-white)"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Police Abuses"},{"hid":"og:description","name":"og:description","property":"og:description","content":"## Project setup"}],"link":[{"href":"\u002Fsplashscreens\u002Fiphone5_splash.png","media":"(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fiphone6_splash.png","media":"(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fiphoneplus_splash.png","media":"(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fiphonex_splash.png","media":"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fiphonexr_splash.png","media":"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fiphonexsmax_splash.png","media":"(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fipad_splash.png","media":"(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fipadpro1_splash.png","media":"(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fipadpro3_splash.png","media":"(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"href":"\u002Fsplashscreens\u002Fipadpro2_splash.png","media":"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)","rel":"apple-touch-startup-image"},{"rel":"dns-prefetch","href":"https:\u002F\u002Fwww.google-analytics.com\u002Fanalytics.js"},{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.904dc971.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.9000a6.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.9000a6.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.client && typeof nuxt_plugin_workbox_5be6b81c === 'function') {
    await nuxt_plugin_workbox_5be6b81c(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxticons_f96cfa9c === 'function') {
    await nuxt_plugin_nuxticons_f96cfa9c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_22790be0 === 'function') {
    await nuxt_plugin_googleanalytics_22790be0(app.context, inject)
  }

  if (typeof nuxt_plugin_compositionapi_f2a0457e === 'function') {
    await nuxt_plugin_compositionapi_f2a0457e(app.context, inject)
  }

  if (typeof nuxt_plugin_vueyoutube_e2e19eb4 === 'function') {
    await nuxt_plugin_vueyoutube_e2e19eb4(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
