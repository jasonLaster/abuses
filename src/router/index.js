import Vue from 'vue'
import VueRouter from 'vue-router'
import Incidents from '@/views/Incidents.vue'
import IncidentDetails from '@/views/IncidentDetails.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/incident/:id',
    name: 'IncidentDetails',
    component: IncidentDetails,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/',
    name: 'Root',
    component: Incidents,
    props: true,
    children: [
      {
        path: 'city/:city',
        name: 'City',
        component: Incidents,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
