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
    path: '/',
    name: 'Root',
    component: Incidents,
    props: true,
    children: [
      {
        path: 'city/:city',
        name: 'City',
        component: Incidents,
        props: (route) => ({ city: route.params.city }),
        children: [
          // This route exists only because vue-router cannot persist non-url
          // state. See https://github.com/vuejs/vue-router/issues/2243. When
          // the incident modal is closed, we want the user to return to the
          // filtered list they were previously looking at. An unfortunate side
          // effect of defining a new route for this is that we have two urls
          // for each incident.
          {
            path: '/incident/:id',
            name: 'CityIncident',
            component: IncidentDetails,
          },
        ],
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = new VueRouter({
  routes,
})

export default router
