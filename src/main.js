import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueYoutube)
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
