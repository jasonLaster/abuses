import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueYoutube from 'vue-youtube'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueYoutube)
Vue.use(VueMeta)
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
