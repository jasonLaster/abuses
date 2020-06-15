import Vue from 'vue'
import VueRouter from 'vue-router'
import Incidents from '../views/Incidents.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:id?',
    name: 'IncidentDetails',
    component: Incidents,
  },
]

const router = new VueRouter({
  routes,
})

export default router
