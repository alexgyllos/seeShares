import Vue from 'vue'
import App from './App.vue'
import router from './router'
import HighchartsVue from 'highcharts-vue'
import moment from 'moment'
import stockInit from 'highcharts/modules/stock';
import Highcharts from 'highcharts';

  stockInit(Highcharts);




Vue.config.productionTip = false
Vue.use(HighchartsVue)
Vue.use(moment)


Vue.prototype.moment = moment

export const eventBus = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
