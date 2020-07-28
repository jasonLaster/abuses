import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4edf193a = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _2fa801ee = () => interopDefault(import('../pages/NotFound.vue' /* webpackChunkName: "pages/NotFound" */))
const _24301f40 = () => interopDefault(import('../pages/City/_city.vue' /* webpackChunkName: "pages/City/_city" */))
const _696c2702 = () => interopDefault(import('../pages/incidents/_id.vue' /* webpackChunkName: "pages/incidents/_id" */))
const _fe53a370 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _4edf193a,
    name: "About"
  }, {
    path: "/NotFound",
    component: _2fa801ee,
    name: "NotFound"
  }, {
    path: "/City/:city?",
    component: _24301f40,
    name: "City-city"
  }, {
    path: "/incidents/:id?",
    component: _696c2702,
    name: "incidents-id"
  }, {
    path: "/",
    component: _fe53a370,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
