import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _01f4393b = () => interopDefault(import('../pages/1index.vue' /* webpackChunkName: "pages/1index" */))
const _4edf193a = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _2fa801ee = () => interopDefault(import('../pages/NotFound.vue' /* webpackChunkName: "pages/NotFound" */))
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
    path: "/1index",
    component: _01f4393b,
    name: "1index"
  }, {
    path: "/About",
    component: _4edf193a,
    name: "About"
  }, {
    path: "/NotFound",
    component: _2fa801ee,
    name: "NotFound"
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
