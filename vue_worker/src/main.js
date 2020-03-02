import Vue from 'vue'
import VueWorker from 'vue-worker'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueWorker)

new Vue({
  render: h => h(App),
}).$mount('#app')
