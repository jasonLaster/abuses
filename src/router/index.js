import Vue from 'vue'
import VueRouter from 'vue-router'
import Videos from '../views/Videos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id?',
    name: 'VideoDetails',
    component: Videos,
  },
]

const router = new VueRouter({
  routes,
})

export default router
