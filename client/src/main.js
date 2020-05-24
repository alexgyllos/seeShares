import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'

Vue.config.productionTip = false
Vue.use(HighchartsVue)

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
